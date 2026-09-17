import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed'],
      default: 'active',
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
    quizAttempts: [
      {
        levelId: mongoose.Schema.Types.ObjectId,
        score: Number,
        total: Number,
        percent: Number,
        takenAt: { type: Date, default: Date.now },
      },
    ],
    // skill map: name -> percent
    skillProgress: [{ name: String, percent: { type: Number, default: 0 } }],
    minutesLearned: { type: Number, default: 0 },
    // rolling log so the parent dashboard can chart "this week"
    activity: [
      {
        at: { type: Date, default: Date.now },
        kind: { type: String, enum: ['lesson', 'quiz', 'class', 'project'] },
        label: String,
        minutes: { type: Number, default: 0 },
      },
    ],
    certificateIssuedAt: Date,
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);
