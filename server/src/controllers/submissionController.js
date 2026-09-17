import Submission from '../models/Submission.js';
import Enrollment from '../models/Enrollment.js';
import { asyncHandler } from '../middleware/error.js';

export const submitProject = asyncHandler(async (req, res) => {
  const { courseId, levelId, title, url, notes } = req.body;

  const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
  if (!enrollment) return res.status(403).json({ message: 'Enrol in the course first.' });

  const submission = await Submission.create({
    student: req.user._id,
    course: courseId,
    levelId,
    title,
    url,
    notes,
  });

  enrollment.activity.push({ kind: 'project', label: title, minutes: 30 });
  await enrollment.save();

  res.status(201).json({ submission });
});

export const mySubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ student: req.user._id })
    .sort('-createdAt')
    .populate('course', 'title emoji');
  res.json({ submissions });
});

export const reviewQueue = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ status: 'submitted' })
    .sort('createdAt')
    .populate('student', 'name age')
    .populate('course', 'title emoji');
  res.json({ submissions });
});

export const reviewSubmission = asyncHandler(async (req, res) => {
  const { feedback, status = 'reviewed' } = req.body;
  const submission = await Submission.findByIdAndUpdate(
    req.params.id,
    { feedback, status, reviewedBy: req.user._id, reviewedAt: new Date() },
    { new: true }
  );
  if (!submission) return res.status(404).json({ message: 'That submission does not exist.' });
  res.json({ submission });
});
