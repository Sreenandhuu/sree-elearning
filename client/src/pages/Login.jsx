import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-ink text-paper p-10">
        <div className="font-display text-2xl font-extrabold">Sree Learn</div>
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] max-w-md">
            A learning path, not a pile of videos.
          </h1>
          <p className="mt-5 text-paper/70 max-w-sm leading-relaxed">
            Short lessons through the week, a live class on the weekend, and something built by
            the end of it.
          </p>
          <div className="mt-8 flex gap-[3px]" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className={`h-4 w-4 ${i < 11 ? 'bg-brass' : 'bg-white/15'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-paper/40">Chess · Web · AI · Security</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-display text-3xl font-bold">Sign in</h2>
          <p className="text-sm text-muted mt-2 mb-7">
            New here? <Link to="/register" className="text-teal underline">Create an account</Link>
          </p>

          {error && (
            <p className="mb-4 text-sm text-coral border border-coral/40 bg-coral/5 px-3 py-2 rounded-card">
              {error}
            </p>
          )}

          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="field mb-4"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="field mb-6"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="btn-primary w-full" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-8 border-t border-slate-line pt-4 text-xs text-muted leading-relaxed">
            <p className="font-medium text-ink mb-1">Demo accounts</p>
            student@sreelearn.test · parent@sreelearn.test · teacher@sreelearn.test
            <br />
            Password for all three: password123
          </div>
        </form>
      </div>
    </div>
  );
}
