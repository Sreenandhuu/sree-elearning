import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Enrollment from './models/Enrollment.js';
import LiveClass from './models/LiveClass.js';
import { courses } from './data/courses.js';

async function run() {
  await connectDB(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Enrollment.deleteMany({}),
    LiveClass.deleteMany({}),
  ]);

  // Order lessons within each level.
  courses.forEach((c) =>
    c.levels.forEach((l) => l.lessons.forEach((ls, i) => (ls.order = i + 1)))
  );

  const created = await Course.insertMany(courses);
  const bySlug = Object.fromEntries(created.map((c) => [c.slug, c]));

  // AI/ML builds on web development.
  bySlug['ai-and-ml'].prerequisites = [bySlug['web-development']._id];
  await bySlug['ai-and-ml'].save();

  const mk = async (data, password) => {
    const u = new User(data);
    await u.setPassword(password);
    await u.save();
    return u;
  };

  const teacher = await mk(
    {
      name: 'Anita Menon',
      email: 'teacher@sreelearn.test',
      role: 'teacher',
      bio: 'Teaches web development and AI.',
      tracks: ['webdev', 'aiml'],
    },
    'password123'
  );

  const student = await mk(
    {
      name: 'Sreenandu',
      email: 'student@sreelearn.test',
      role: 'student',
      age: 13,
      linkCode: 'SREE01',
    },
    'password123'
  );

  const parent = await mk(
    { name: 'Rekha', email: 'parent@sreelearn.test', role: 'parent' },
    'password123'
  );

  parent.children = [student._id];
  await parent.save();
  student.guardians = [parent._id];
  await student.save();

  // Enrol the demo student in three tracks with some progress already made.
  const seedEnrollment = async (course, lessonsToComplete) => {
    const allLessons = course.levels.flatMap((l) => l.lessons);
    const done = allLessons.slice(0, lessonsToComplete);
    const doneIds = done.map((l) => l._id);

    const totals = {};
    const hits = {};
    course.skills.forEach((s) => {
      totals[s.name] = 0;
      hits[s.name] = 0;
    });
    allLessons.forEach((l) => {
      if (!l.skill || totals[l.skill] === undefined) return;
      totals[l.skill] += 1;
      if (doneIds.some((id) => id.equals(l._id))) hits[l.skill] += 1;
    });

    return Enrollment.create({
      student: student._id,
      course: course._id,
      completedLessons: doneIds,
      minutesLearned: done.reduce((n, l) => n + l.minutes, 0),
      skillProgress: course.skills.map((s) => ({
        name: s.name,
        percent: totals[s.name] ? Math.round((hits[s.name] / totals[s.name]) * 100) : 0,
      })),
      activity: done.map((l, i) => ({
        at: new Date(Date.now() - (done.length - i) * 20 * 60 * 60 * 1000),
        kind: 'lesson',
        label: l.title,
        minutes: l.minutes,
      })),
      quizAttempts: [
        {
          levelId: course.levels[0]._id,
          score: 2,
          total: 3,
          percent: 67,
          takenAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      ],
    });
  };

  await seedEnrollment(bySlug['web-development'], 11);
  await seedEnrollment(bySlug['chess'], 7);
  await seedEnrollment(bySlug['ai-and-ml'], 3);

  // Upcoming and past live classes.
  const soon = (days, hour) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return d;
  };

  await LiveClass.insertMany([
    {
      course: bySlug['web-development']._id,
      teacher: teacher._id,
      title: 'Flexbox layouts, live',
      agenda: 'We build a card layout together, then you rebuild it on your own page.',
      startsAt: soon(2, 18),
      durationMin: 60,
      meetingUrl: 'https://meet.google.com/demo-webdev-01',
      levelOrder: 2,
    },
    {
      course: bySlug['chess']._id,
      teacher: teacher._id,
      title: 'Tactics drill: forks and pins',
      startsAt: soon(3, 17),
      durationMin: 45,
      meetingUrl: 'https://meet.google.com/demo-chess-01',
      levelOrder: 2,
    },
    {
      course: bySlug['ai-and-ml']._id,
      teacher: teacher._id,
      title: 'Reading your first CSV',
      startsAt: soon(5, 18),
      durationMin: 60,
      meetingUrl: 'https://meet.google.com/demo-aiml-01',
      levelOrder: 2,
    },
    {
      course: bySlug['web-development']._id,
      teacher: teacher._id,
      title: 'CSS colours and fonts',
      startsAt: soon(-5, 18),
      durationMin: 60,
      meetingUrl: 'https://meet.google.com/demo-webdev-00',
      levelOrder: 2,
      attendance: [{ student: student._id, joinedAt: soon(-5, 18) }],
    },
    {
      course: bySlug['chess']._id,
      teacher: teacher._id,
      title: 'Opening principles',
      startsAt: soon(-7, 17),
      durationMin: 45,
      meetingUrl: 'https://meet.google.com/demo-chess-00',
      levelOrder: 1,
      attendance: [{ student: student._id, joinedAt: soon(-7, 17) }],
    },
  ]);

  console.log(`
Seeded.

  Student  student@sreelearn.test  / password123
  Parent   parent@sreelearn.test   / password123
  Teacher  teacher@sreelearn.test  / password123

  Link code for Sreenandu: SREE01
`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
