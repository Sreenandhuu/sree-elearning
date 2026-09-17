import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  minutes: { type: Number, default: 8 },
  type: {
    type: String,
    enum: ['video', 'reading', 'challenge'],
    default: 'video',
  },
  videoUrl: String,
  content: String, // markdown-ish body for reading / challenge brief
  skill: String, // which skill on the skill map this lesson feeds
  order: { type: Number, default: 0 },
});

const questionSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  explanation: String,
});

const levelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  order: { type: Number, default: 0 },
  lessons: [lessonSchema],
  quiz: {
    title: String,
    passScore: { type: Number, default: 70 },
    questions: [questionSchema],
  },
  project: {
    title: String,
    brief: String,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    track: {
      type: String,
      enum: ['chess', 'webdev', 'aiml', 'cyber'],
      required: true,
    },
    tagline: String,
    description: String,
    emoji: { type: String, default: '📘' },
    ageMin: { type: Number, default: 10 },
    ageMax: { type: Number, default: 14 },
    priceCents: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    durationWeeks: { type: Number, default: 12 },
    classesPerWeek: { type: Number, default: 1 },
    // ordered skill map for this course
    skills: [{ name: String, order: Number }],
    // what you should finish before this one
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    levels: [levelSchema],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.virtual('totalLessons').get(function () {
  return this.levels.reduce((n, l) => n + l.lessons.length, 0);
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

export default mongoose.model('Course', courseSchema);
