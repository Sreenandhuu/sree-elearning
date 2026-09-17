import User from '../models/User.js';
import { verifyToken } from '../utils/token.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Sign in to continue.' });

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'That account no longer exists.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Your session expired. Sign in again.' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have access to this.' });
    }
    next();
  };
}
