import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function LiveClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/live-classes')
      .then(({ classes }) => setClasses(classes))
      .finally(() => setLoading(false));
  }, []);

  async function join(id) {
    setError('');
    try {
      const { meetingUrl } = await api(`/live-classes/${id}/join`, { method: 'POST' });
      window.open(meetingUrl, '_blank', 'noopener');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">Live classes</h1>
      <p className="text-muted mt-2">The room opens 15 minutes before each class starts.</p>

      {error && <p className="text-sm text-coral mt-4">{error}</p>}

      {classes.length === 0 ? (
        <p className="panel p-6 mt-7 text-sm text-muted">
          Nothing scheduled. Once you start a track, your classes show up here.
        </p>
      ) : (
        <div className="panel divide-y divide-slate-line mt-7">
          {classes.map((c) => (
            <div key={c._id} className="p-5 flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="font-medium">
                  {c.course.emoji} {c.title}
                </div>
                <div className="text-sm text-muted mt-1">
                  {c.course.title} · {c.teacher?.name} · {c.durationMin} min
                </div>
                <div className="font-mono text-sm mt-2">
                  {new Date(c.startsAt).toLocaleString(undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
                {c.agenda && (
                  <p className="text-sm text-muted mt-2 max-w-prose leading-relaxed">{c.agenda}</p>
                )}
              </div>
              <button
                className={c.joinable ? 'btn-primary' : 'btn-ghost'}
                onClick={() => join(c._id)}
                disabled={!c.joinable}
              >
                {c.joinable ? 'Join class' : 'Not open yet'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
