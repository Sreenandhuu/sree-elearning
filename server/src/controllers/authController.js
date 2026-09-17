import crypto from 'crypto';
import User from '../models/User.js';
import { signToken } from '../utils/token.js';
import { asyncHandler } from '../middleware/error.js';

const makeLinkCode = () =>
  crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "9F2C1A"

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'student', age } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password needs at least 8 characters.' });
  }
  if (await User.findOne({ email: email.toLowerCase() })) {
    return res.status(409).json({ message: 'An account already uses that email.' });
  }

  const user = new User({ name, email, role, age });
  if (role === 'student') user.linkCode = makeLinkCode();
  await user.setPassword(password);
  await user.save();

  res.status(201).json({ token: signToken(user), user: user.toPublic() });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || !(await user.checkPassword(password || ''))) {
    return res.status(401).json({ message: 'Email or password is incorrect.' });
  }
  res.json({ token: signToken(user), user: user.toPublic() });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toPublic() });
});

// A parent types the code shown on their child's profile.
export const linkChild = asyncHandler(async (req, res) => {
  const { linkCode } = req.body;
  const child = await User.findOne({
    linkCode: (linkCode || '').toUpperCase(),
    role: 'student',
  });
  if (!child) return res.status(404).json({ message: 'No student matches that code.' });

  if (!req.user.children.some((id) => id.equals(child._id))) {
    req.user.children.push(child._id);
    await req.user.save();
  }
  if (!child.guardians.some((id) => id.equals(req.user._id))) {
    child.guardians.push(req.user._id);
    await child.save();
  }
  res.json({ message: `${child.name} is linked to your account.`, child: child.toPublic() });
});
