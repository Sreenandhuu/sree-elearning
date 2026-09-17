import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import TrackBadge from '../components/TrackBadge';

const price = (cents, currency) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency || 'INR',
    maximumFractionDigits: 0,
  }).format(cents / 100);

export default function Catalog() {
  const [courses, setCourses] = useState([]);
  const [track, setTrack] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api(`/courses${track ? `?track=${track}` : ''}`)
      .then(({ courses }) => setCourses(courses))
      .finally(() => setLoading(false));
  }, [track]);

  const filters = [
    { value: '', label: 'All' },
    { value: 'chess', label: 'Chess' },
    { value: 'webdev', label: 'Web' },
    { value: 'aiml', label: 'AI & ML' },
    { value: 'cyber', label: 'Security' },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">Courses</h1>
      <p className="text-muted mt-2 max-w-lg leading-relaxed">
        Each track runs for several weeks: short lessons you do on your own, a live class, and
        something you build.
      </p>

      <div className="flex gap-2 mt-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setTrack(f.value)}
            className={`px-3 py-1.5 text-sm rounded-card border ${
              track === f.value
                ? 'bg-ink text-white border-ink'
                : 'border-slate-line text-muted hover:text-ink'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted mt-8">Loading…</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5 mt-7">
          {courses.map((c) => (
            <Link
              key={c._id}
              to={`/courses/${c.slug}`}
              className="panel p-6 hover:border-ink transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{c.emoji}</span>
                <TrackBadge track={c.track} />
              </div>
              <h2 className="font-display text-xl font-bold mt-4">{c.title}</h2>
              <p className="text-sm text-muted mt-1.5 leading-relaxed">{c.tagline}</p>

              <dl className="mt-5 pt-4 border-t border-slate-line grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt className="text-muted text-xs">Ages</dt>
                  <dd className="font-mono">{c.ageMin}–{c.ageMax}</dd>
                </div>
                <div>
                  <dt className="text-muted text-xs">Weeks</dt>
                  <dd className="font-mono">{c.durationWeeks}</dd>
                </div>
                <div>
                  <dt className="text-muted text-xs">Price</dt>
                  <dd className="font-mono">{price(c.priceCents, c.currency)}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
