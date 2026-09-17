import LiveClass from '../models/LiveClass.js';
import Enrollment from '../models/Enrollment.js';
import { asyncHandler } from '../middleware/error.js';

export const upcomingForStudent = asyncHandler(async (req, res) => {
  const studentId = req.query.studentId || req.user._id;

  if (String(studentId) !== String(req.user._id)) {
    const allowed =
      ['teacher', 'admin'].includes(req.user.role) ||
      req.user.children.some((id) => String(id) === String(studentId));
    if (!allowed) return res.status(403).json({ message: 'You do not have access to this.' });
  }

  const enrollments = await Enrollment.find({ student: studentId }).select('course');
  const courseIds = enrollments.map((e) => e.course);

  const classes = await LiveClass.find({
    course: { $in: courseIds },
    startsAt: { $gte: new Date() },
  })
    .sort('startsAt')
    .limit(10)
    .populate('course', 'title slug emoji track')
    .populate('teacher', 'name');

  // Only hand out the meeting link inside the join window.
  const now = Date.now();
  const rows = classes.map((c) => {
    const opens = new Date(c.startsAt).getTime() - 15 * 60 * 1000;
    const obj = c.toObject();
    obj.joinable = now >= opens;
    if (!obj.joinable) delete obj.meetingUrl;
    delete obj.attendance;
    return obj;
  });

  res.json({ classes: rows });
});

export const joinClass = asyncHandler(async (req, res) => {
  const liveClass = await LiveClass.findById(req.params.id);
  if (!liveClass) return res.status(404).json({ message: 'That class does not exist.' });

  const enrolled = await Enrollment.findOne({
    student: req.user._id,
    course: liveClass.course,
  });
  if (!enrolled) return res.status(403).json({ message: 'Enrol in the course to join this class.' });

  const opens = new Date(liveClass.startsAt).getTime() - 15 * 60 * 1000;
  if (Date.now() < opens) {
    return res.status(425).json({ message: 'The room opens 15 minutes before the class.' });
  }

  if (!liveClass.attendance.some((a) => String(a.student) === String(req.user._id))) {
    liveClass.attendance.push({ student: req.user._id, joinedAt: new Date() });
    await liveClass.save();
    enrolled.activity.push({ kind: 'class', label: liveClass.title, minutes: liveClass.durationMin });
    await enrolled.save();
  }

  res.json({ meetingUrl: liveClass.meetingUrl });
});

export const createClass = asyncHandler(async (req, res) => {
  const liveClass = await LiveClass.create({ ...req.body, teacher: req.user._id });
  res.status(201).json({ liveClass });
});

export const teacherSchedule = asyncHandler(async (req, res) => {
  const classes = await LiveClass.find({ teacher: req.user._id })
    .sort('startsAt')
    .populate('course', 'title emoji')
    .populate('attendance.student', 'name');
  res.json({ classes });
});
