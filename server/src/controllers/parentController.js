import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';
import Submission from '../models/Submission.js';
import LiveClass from '../models/LiveClass.js';
import { asyncHandler } from '../middleware/error.js';

export const listChildren = asyncHandler(async (req, res) => {
  const children = await User.find({ _id: { $in: req.user.children } });
  res.json({ children: children.map((c) => c.toPublic()) });
});

export const childReport = asyncHandler(async (req, res) => {
  const childId = req.params.childId;
  const allowed =
    req.user.children.some((id) => String(id) === String(childId)) ||
    ['teacher', 'admin'].includes(req.user.role);
  if (!allowed) return res.status(403).json({ message: 'You do not have access to this.' });

  const child = await User.findById(childId);
  if (!child) return res.status(404).json({ message: 'That student does not exist.' });

  const enrollments = await Enrollment.find({ student: childId }).populate(
    'course',
    'title slug track emoji levels skills'
  );

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  let minutesThisWeek = 0;
  enrollments.forEach((e) =>
    e.activity.forEach((a) => {
      if (a.at >= weekAgo) minutesThisWeek += a.minutes || 0;
    })
  );

  // Attendance: classes that have already run for courses the child is in.
  const courseIds = enrollments.map((e) => e.course._id);
  const pastClasses = await LiveClass.find({
    course: { $in: courseIds },
    startsAt: { $lt: new Date() },
  });
  const attended = pastClasses.filter((c) =>
    c.attendance.some((a) => String(a.student) === String(childId))
  ).length;
  const attendancePercent = pastClasses.length
    ? Math.round((attended / pastClasses.length) * 100)
    : null;

  const submissions = await Submission.find({ student: childId })
    .sort('-createdAt')
    .populate('course', 'title emoji');

  const courses = enrollments.map((e) => {
    const totalLessons = e.course.levels.reduce((n, l) => n + l.lessons.length, 0);
    return {
      id: e._id,
      course: {
        title: e.course.title,
        slug: e.course.slug,
        emoji: e.course.emoji,
        track: e.course.track,
      },
      status: e.status,
      percent: totalLessons
        ? Math.round((e.completedLessons.length / totalLessons) * 100)
        : 0,
      lessonsDone: e.completedLessons.length,
      totalLessons,
      skillProgress: e.skillProgress,
      minutesLearned: e.minutesLearned,
      lastQuiz: e.quizAttempts.at(-1) || null,
      certificateIssuedAt: e.certificateIssuedAt,
    };
  });

  const nextClass = await LiveClass.findOne({
    course: { $in: courseIds },
    startsAt: { $gte: new Date() },
  })
    .sort('startsAt')
    .populate('course', 'title emoji');

  res.json({
    child: child.toPublic(),
    summary: {
      minutesThisWeek,
      activeCourses: courses.filter((c) => c.status === 'active').length,
      attendancePercent,
      classesHeld: pastClasses.length,
      classesAttended: attended,
      projectsCompleted: submissions.filter((s) => s.status === 'reviewed').length,
    },
    courses,
    nextClass,
    feedback: submissions
      .filter((s) => s.feedback)
      .slice(0, 5)
      .map((s) => ({
        course: s.course?.title,
        title: s.title,
        feedback: s.feedback,
        reviewedAt: s.reviewedAt,
      })),
  });
});
