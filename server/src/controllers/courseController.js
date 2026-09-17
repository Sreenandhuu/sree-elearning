import Course from '../models/Course.js';
import { asyncHandler } from '../middleware/error.js';

export const listCourses = asyncHandler(async (req, res) => {
  const { track, age } = req.query;
  const filter = { published: true };
  if (track) filter.track = track;
  if (age) {
    filter.ageMin = { $lte: Number(age) };
    filter.ageMax = { $gte: Number(age) };
  }
  // Strip level bodies from the catalog payload — it gets big fast.
  const courses = await Course.find(filter).select('-levels.lessons.content -levels.quiz');
  res.json({ courses });
});

export const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate(
    'prerequisites',
    'title slug emoji'
  );
  if (!course) return res.status(404).json({ message: 'That course does not exist.' });

  // Hide answer keys from anyone who is not a teacher.
  const payload = course.toObject();
  if (!req.user || !['teacher', 'admin'].includes(req.user.role)) {
    payload.levels.forEach((lvl) => {
      if (lvl.quiz?.questions) {
        lvl.quiz.questions = lvl.quiz.questions.map((q) => ({
          _id: q._id,
          prompt: q.prompt,
          options: q.options,
        }));
      }
    });
  }
  res.json({ course: payload });
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) return res.status(404).json({ message: 'That course does not exist.' });
  res.json({ course });
});
