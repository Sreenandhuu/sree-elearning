import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    age: 12,
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = { ...form };
      if (payload.role !== 'student') delete payload.age;
      await register(payload);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h2 className="font-display text-3xl font-bold">Create an account</h2>
        <p className="text-sm text-muted mt-2 mb-7">
          Already have one? <Link to="/login" className="text-teal underline">Sign in</Link>
        </p>

        {error && (
          <p className="mb-4 text-sm text-coral border border-coral/40 bg-coral/5 px-3 py-2 rounded-card">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { value: 'student', label: "I'm the learner" },
            { value: 'parent', label: "I'm a parent" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, role: opt.value })}
              className={`px-3 py-3 text-sm rounded-card border text-left ${
                form.role === opt.value
                  ? 'border-teal bg-teal/5 text-ink font-medium'
                  : 'border-slate-line text-muted'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <label className="label" htmlFor="name">Name</label>
        <input
          id="name"
          className="field mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {form.role === 'student' && (
          <>
            <label className="label" htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="5"
              max="18"
              className="field mb-4"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
            />
          </>
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
          className="field mb-1"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <p className="text-xs text-muted mb-6">At least 8 characters.</p>

        <button className="btn-primary w-full" disabled={busy}>
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
