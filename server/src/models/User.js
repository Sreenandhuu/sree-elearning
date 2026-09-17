import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'parent', 'teacher', 'admin'],
      default: 'student',
    },
    // student fields
    age: { type: Number, min: 5, max: 18 },
    avatar: { type: String, default: '' },
    guardians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // a short code a parent types in to link to this child
    linkCode: { type: String, index: true },
    // parent fields
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // teacher fields
    bio: { type: String, default: '' },
    tracks: [{ type: String }],
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, 10);
};

userSchema.methods.checkPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.methods.toPublic = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    age: this.age,
    avatar: this.avatar,
    linkCode: this.linkCode,
    children: this.children,
  };
};

export default mongoose.model('User', userSchema);
