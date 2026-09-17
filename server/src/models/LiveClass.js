import mongoose from 'mongoose';

const liveClassSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    agenda: String,
    startsAt: { type: Date, required: true },
    durationMin: { type: Number, default: 60 },
    meetingUrl: { type: String, required: true },
    levelOrder: Number,
    attendance: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        joinedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

liveClassSchema.index({ startsAt: 1 });

export default mongoose.model('LiveClass', liveClassSchema);
