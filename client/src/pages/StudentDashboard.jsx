import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import RankMeter from '../components/RankMeter';
import TrackBadge, { trackTone } from '../components/TrackBadge';

const fmtWhen = (d) =>
  new Date(d).toLocaleString(undefined, {
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
  });

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api('/enrollments'), api('/live-classes')])
      .then(([e, c]) => {
        setEnrollments(e.enrollments);
        setClasses(c.classes);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  const active = enrollments.filter((e) => e.status !== 'completed');
  const current = [...active].sort((a, b) => b.percent - a.percent)[0];
  const nextClass = classes[0];

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">Hello, {user.name}</h1>

      {enrollments.length === 0 ? (
        <div className="panel p-8 mt-8 text-center">
          <p className="font-display text-xl font-bold">Nothing started yet</p>
          <p className="text-sm text-muted mt-2 mb-5">
            Pick a track and your first week will be waiting here.
          </p>
          <Link to="/courses" className="btn-primary">Browse courses</Link>
        </div>
      ) : (
        <>
          {current && (
            <section className="mt-7">
              <div className="panel p-6 border-l-4 border-l-brass">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-sm text-muted">Pick up where you left off</div>
                    <h2 className="font-display text-2xl font-bold mt-1">
                      {current.course.emoji} {current.course.title}
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      {current.completedLessons.length} of {current.totalLessons} lessons done
                    </p>
                  </div>
                  <Link to={`/learn/${current._id}`} className="btn-primary">
                    Continue learning
                  </Link>
                </div>
                <div className="mt-5">
                  <RankMeter
                    percent={current.percent}
                    cells={16}
                    tone="brass"
                    label={`${current.course.title} progress`}
                  />
                </div>
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-display text-lg font-bold mb-3">My learning</h2>
            <div className="panel divide-y divide-slate-line">
              {enrollments.map((e) => (
                <Link
                  key={e._id}
                  to={`/learn/${e._id}`}
                  className="flex items-center gap-4 p-4 hover:bg-paper"
                >
                  <span className="text-xl w-7 text-center">{e.course.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{e.course.title}</span>
                      <TrackBadge track={e.course.track} />
                      {e.status === 'completed' && (
                        <span className="text-xs text-teal font-medium">Certificate earned</span>
                      )}
                    </div>
                  </div>
                  <RankMeter
                    percent={e.percent}
                    cells={10}
                    tone={trackTone(e.course.track)}
                    label={`${e.course.title} progress`}
                  />
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-lg font-bold mb-3">Next live class</h2>
          {nextClass ? (
            <div className="panel p-5">
              <div className="font-medium">{nextClass.title}</div>
              <div className="text-sm text-muted mt-1">
                {nextClass.course.emoji} {nextClass.course.title}
              </div>
              <div className="font-mono text-sm mt-3">{fmtWhen(nextClass.startsAt)}</div>
              {nextClass.agenda && (
                <p className="text-sm text-muted mt-3 leading-relaxed">{nextClass.agenda}</p>
              )}
              <Link to="/classes" className="btn-ghost mt-4">See all classes</Link>
            </div>
          ) : (
            <div className="panel p-5 text-sm text-muted">
              No classes scheduled. Enrol in a track to get on the timetable.
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-lg font-bold mb-3">Skill map</h2>
          {current ? (
            <div className="panel p-5 space-y-3">
              {current.skillProgress.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-4">
                  <span className="text-sm w-24 shrink-0">{s.name}</span>
                  <RankMeter
                    percent={s.percent}
                    cells={10}
                    tone={trackTone(current.course.track)}
                    label={s.name}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="panel p-5 text-sm text-muted">
              Finish a few lessons and your skills will show up here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
