import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { asyncHandler } from '../middleware/error.js';

/** Recalculate the skill map from whichever lessons are done. */
function recomputeSkills(course, enrollment) {
  const done = new Set(enrollment.completedLessons.map(String));
  const totals = {};
  const hits = {};

  course.skills.forEach((s) => {
    totals[s.name] = 0;
    hits[s.name] = 0;
  });

  course.levels.forEach((lvl) =>
    lvl.lessons.forEach((lesson) => {
      const skill = lesson.skill;
      if (!skill || totals[skill] === undefined) return;
      totals[skill] += 1;
      if (done.has(String(lesson._id))) hits[skill] += 1;
    })
  );

  enrollment.skillProgress = course.skills.map((s) => ({
    name: s.name,
    percent: totals[s.name] ? Math.round((hits[s.name] / totals[s.name]) * 100) : 0,
  }));
}

function percentComplete(course, enrollment) {
  const total = course.levels.reduce((n, l) => n + l.lessons.length, 0);
  if (!total) return 0;
  return Math.round((enrollment.completedLessons.length / total) * 100);
}

/**
 * Enrollment responses populate the whole course, which carries the quiz answer
 * keys. Strip them for anyone who is not teaching — otherwise a student can read
 * correctIndex straight out of the network tab.
 */
function stripAnswerKeys(courseObj, user) {
  if (['teacher', 'admin'].includes(user?.role)) return courseObj;
  courseObj.levels?.forEach((lvl) => {
    if (!lvl.quiz?.questions) return;
    lvl.quiz.questions = lvl.quiz.questions.map((q) => ({
      _id: q._id,
      prompt: q.prompt,
      options: q.options,
    }));
  });
  return courseObj;
}

export const enroll = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.body.courseId);
  if (!course) return res.status(404).json({ message: 'That course does not exist.' });

  const existing = await Enrollment.findOne({ student: req.user._id, course: course._id });
  if (existing) return res.json({ enrollment: existing });

  const enrollment = await Enrollment.create({
    student: req.user._id,
    course: course._id,
    skillProgress: course.skills.map((s) => ({ name: s.name, percent: 0 })),
  });
  res.status(201).json({ enrollment });
});

export const myEnrollments = asyncHandler(async (req, res) => {
  const studentId = req.query.studentId || req.user._id;

  // A parent may read their own child's rows; nobody else's.
  if (String(studentId) !== String(req.user._id)) {
    const allowed =
      req.user.role === 'teacher' ||
      req.user.role === 'admin' ||
      req.user.children.some((id) => String(id) === String(studentId));
    if (!allowed) return res.status(403).json({ message: 'You do not have access to this.' });
  }

  const enrollments = await Enrollment.find({ student: studentId }).populate(
    'course',
    'title slug track emoji durationWeeks skills levels'
  );

  const rows = enrollments.map((e) => {
    const obj = e.toObject();
    obj.percent = percentComplete(e.course, e);
    obj.totalLessons = e.course.levels.reduce((n, l) => n + l.lessons.length, 0);
    obj.course = stripAnswerKeys(obj.course, req.user);
    return obj;
  });
  res.json({ enrollments: rows });
});

export const completeLesson = asyncHandler(async (req, res) => {
  const { lessonId, minutes = 0 } = req.body;
  const enrollment = await Enrollment.findOne({
    _id: req.params.id,
    student: req.user._id,
  });
  if (!enrollment) return res.status(404).json({ message: 'Enrollment not found.' });

  const course = await Course.findById(enrollment.course);
  const lesson = course.levels
    .flatMap((l) => l.lessons)
    .find((ls) => String(ls._id) === String(lessonId));
  if (!lesson) return res.status(404).json({ message: 'That lesson is not in this course.' });

  if (!enrollment.completedLessons.some((id) => String(id) === String(lessonId))) {
    enrollment.completedLessons.push(lesson._id);
    enrollment.minutesLearned += minutes || lesson.minutes || 0;
    enrollment.activity.push({
      kind: 'lesson',
      label: lesson.title,
      minutes: minutes || lesson.minutes || 0,
    });
  }

  recomputeSkills(course, enrollment);

  const percent = percentComplete(course, enrollment);
  if (percent === 100 && enrollment.status !== 'completed') {
    enrollment.status = 'completed';
    enrollment.completedAt = new Date();
    enrollment.certificateIssuedAt = new Date();
  }
  await enrollment.save();

  res.json({ enrollment, percent });
});

export const submitQuiz = asyncHandler(async (req, res) => {
  const { levelId, answers = [] } = req.body;
  const enrollment = await Enrollment.findOne({
    _id: req.params.id,
    student: req.user._id,
  });
  if (!enrollment) return res.status(404).json({ message: 'Enrollment not found.' });

  const course = await Course.findById(enrollment.course);
  const level = course.levels.id(levelId);
  if (!level?.quiz?.questions?.length) {
    return res.status(404).json({ message: 'This level has no quiz.' });
  }

  const results = level.quiz.questions.map((q, i) => ({
    questionId: q._id,
    correct: answers[i] === q.correctIndex,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }));
  const score = results.filter((r) => r.correct).length;
  const total = results.length;
  const percent = Math.round((score / total) * 100);

  enrollment.quizAttempts.push({ levelId, score, total, percent });
  enrollment.activity.push({
    kind: 'quiz',
    label: level.quiz.title || `${level.title} quiz`,
    minutes: 5,
  });
  await enrollment.save();

  res.json({ score, total, percent, passed: percent >= (level.quiz.passScore || 70), results });
});

export const getEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id).populate('course');
  if (!enrollment) return res.status(404).json({ message: 'Enrollment not found.' });

  const isOwner = String(enrollment.student) === String(req.user._id);
  const isGuardian = req.user.children?.some((id) => String(id) === String(enrollment.student));
  if (!isOwner && !isGuardian && !['teacher', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'You do not have access to this.' });
  }

  const payload = enrollment.toObject();
  payload.course = stripAnswerKeys(payload.course, req.user);

  res.json({
    enrollment: payload,
    percent: percentComplete(enrollment.course, enrollment),
  });
});
