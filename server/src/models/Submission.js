import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    levelId: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    url: String,
    notes: String,
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'needs-work'],
      default: 'submitted',
    },
    feedback: String,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Submission', submissionSchema);
