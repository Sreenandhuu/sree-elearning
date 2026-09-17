import { useEffect, useState } from 'react';
import { api } from '../api/client';

function ScheduleForm({ courses, onCreated }) {
  const [form, setForm] = useState({
    course: '',
    title: '',
    agenda: '',
    startsAt: '',
    durationMin: 60,
    meetingUrl: '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/live-classes', {
        method: 'POST',
        body: { ...form, startsAt: new Date(form.startsAt).toISOString() },
      });
      setForm({ ...form, title: '', agenda: '', startsAt: '', meetingUrl: '' });
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="panel p-5">
      <h3 className="font-display text-lg font-bold mb-4">Schedule a class</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="course">Course</label>
          <select
            id="course"
            className="field"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            required
          >
            <option value="">Choose a course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.emoji} {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="title">Class title</label>
          <input
            id="title"
            className="field"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="startsAt">Starts at</label>
          <input
            id="startsAt"
            type="datetime-local"
            className="field"
            value={form.startsAt}
            onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="durationMin">Length (minutes)</label>
          <input
            id="durationMin"
            type="number"
            min="15"
            step="15"
            className="field"
            value={form.durationMin}
            onChange={(e) => setForm({ ...form, durationMin: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="meetingUrl">Meeting link</label>
        <input
          id="meetingUrl"
          type="url"
          className="field"
          placeholder="https://meet.google.com/…"
          value={form.meetingUrl}
          onChange={(e) => setForm({ ...form, meetingUrl: e.target.value })}
          required
        />
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="agenda">What you will cover</label>
        <textarea
          id="agenda"
          rows="2"
          className="field"
          value={form.agenda}
          onChange={(e) => setForm({ ...form, agenda: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-coral mt-3">{error}</p>}

      <button className="btn-primary mt-5" disabled={busy}>
        {busy ? 'Scheduling…' : 'Schedule class'}
      </button>
    </form>
  );
}

function ReviewCard({ submission, onReviewed }) {
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);

  async function send(status) {
    setBusy(true);
    try {
      await api(`/submissions/${submission._id}/review`, {
        method: 'PATCH',
        body: { feedback, status },
      });
      onReviewed();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span className="font-medium">{submission.title}</span>
        <span className="text-sm text-muted">
          {submission.student.name} · {submission.course.emoji} {submission.course.title}
        </span>
      </div>

      {submission.url && (
        <a
          href={submission.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-teal underline mt-2 inline-block break-all"
        >
          {submission.url}
        </a>
      )}
      {submission.notes && (
        <p className="text-sm text-muted mt-2 leading-relaxed">{submission.notes}</p>
      )}

      <textarea
        rows="2"
        className="field mt-3"
        placeholder="What they did well, and one thing to work on."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <div className="flex gap-2 mt-3">
        <button className="btn-primary" disabled={busy || !feedback} onClick={() => send('reviewed')}>
          Send feedback
        </button>
        <button
          className="btn-ghost"
          disabled={busy || !feedback}
          onClick={() => send('needs-work')}
        >
          Ask for changes
        </button>
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  const [schedule, setSchedule] = useState([]);
  const [queue, setQueue] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    Promise.all([api('/teacher/schedule'), api('/teacher/review-queue'), api('/courses')]).then(
      ([s, q, c]) => {
        setSchedule(s.classes);
        setQueue(q.submissions);
        setCourses(c.courses);
      }
    );

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  const upcoming = schedule.filter((c) => new Date(c.startsAt) >= new Date());
  const past = schedule.filter((c) => new Date(c.startsAt) < new Date()).reverse();

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">Teaching</h1>

      <section className="mt-7">
        <h2 className="font-display text-lg font-bold mb-3">Coming up</h2>
        {upcoming.length ? (
          <div className="panel divide-y divide-slate-line">
            {upcoming.map((c) => (
              <div key={c._id} className="p-5 flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-medium">
                    {c.course.emoji} {c.title}
                  </div>
                  <div className="text-sm text-muted mt-1">{c.course.title}</div>
                </div>
                <div className="font-mono text-sm">
                  {new Date(c.startsAt).toLocaleString(undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="panel p-5 text-sm text-muted">Nothing on the calendar yet.</p>
        )}
      </section>

      <section className="mt-9">
        <h2 className="font-display text-lg font-bold mb-3">
          Projects to review
          {queue.length > 0 && (
            <span className="font-sans font-normal text-sm text-muted ml-2">
              {queue.length} waiting
            </span>
          )}
        </h2>
        {queue.length ? (
          <div className="panel divide-y divide-slate-line">
            {queue.map((s) => (
              <ReviewCard key={s._id} submission={s} onReviewed={load} />
            ))}
          </div>
        ) : (
          <p className="panel p-5 text-sm text-muted">
            Nothing waiting. New submissions land here.
          </p>
        )}
      </section>

      <section className="mt-9">
        <ScheduleForm courses={courses} onCreated={load} />
      </section>

      {past.length > 0 && (
        <section className="mt-9">
          <h2 className="font-display text-lg font-bold mb-3">Past classes</h2>
          <div className="panel divide-y divide-slate-line">
            {past.map((c) => (
              <div key={c._id} className="p-4 flex items-center justify-between gap-4 text-sm">
                <span>
                  {c.course.emoji} {c.title}
                </span>
                <span className="text-muted font-mono">
                  {c.attendance.length} attended
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
