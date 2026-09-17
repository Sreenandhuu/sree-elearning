import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import TrackBadge from '../components/TrackBadge';

export default function CourseDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [openLevel, setOpenLevel] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/courses/${slug}`).then(({ course }) => setCourse(course));
    if (user?.role === 'student') {
      api('/enrollments').then(({ enrollments }) =>
        setEnrollment(enrollments.find((e) => e.course.slug === slug) || null)
      );
    }
  }, [slug, user]);

  async function handleEnroll() {
    setBusy(true);
    setError('');
    try {
      const { enrollment } = await api('/enrollments', {
        method: 'POST',
        body: { courseId: course._id },
      });
      navigate(`/learn/${enrollment._id}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  if (!course) return <p className="text-sm text-muted">Loading…</p>;

  const totalLessons = course.levels.reduce((n, l) => n + l.lessons.length, 0);

  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="text-5xl">{course.emoji}</span>
        <div className="flex-1">
          <TrackBadge track={course.track} />
          <h1 className="font-display text-4xl font-extrabold mt-2">{course.title}</h1>
          <p className="text-muted mt-2 max-w-xl leading-relaxed">{course.description}</p>
        </div>
      </div>

      <div className="panel mt-7 p-5 grid grid-cols-2 sm:grid-cols-4 gap-5">
        {[
          ['Ages', `${course.ageMin}–${course.ageMax}`],
          ['Weeks', course.durationWeeks],
          ['Live classes', `${course.classesPerWeek}/week`],
          ['Lessons', totalLessons],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-xs text-muted">{k}</div>
            <div className="font-mono text-lg">{v}</div>
          </div>
        ))}
      </div>

      {course.prerequisites?.length > 0 && (
        <p className="text-sm text-muted mt-4">
          Best after finishing{' '}
          {course.prerequisites.map((p) => `${p.emoji} ${p.title}`).join(', ')}.
        </p>
      )}

      {user?.role === 'student' && (
        <div className="mt-6">
          {enrollment ? (
            <button
              className="btn-primary"
              onClick={() => navigate(`/learn/${enrollment._id}`)}
            >
              Go to my lessons
            </button>
          ) : (
            <button className="btn-primary" onClick={handleEnroll} disabled={busy}>
              {busy ? 'Starting…' : 'Start this track'}
            </button>
          )}
          {error && <p className="text-sm text-coral mt-2">{error}</p>}
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold mb-3">What you will learn</h2>
        <div className="flex flex-wrap gap-2">
          {course.skills.map((s) => (
            <span
              key={s.name}
              className="border border-slate-line px-3 py-1 text-sm rounded-card"
            >
              {s.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold mb-3">The path</h2>
        <div className="panel divide-y divide-slate-line">
          {course.levels.map((level, i) => (
            <div key={level._id}>
              <button
                onClick={() => setOpenLevel(openLevel === i ? -1 : i)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-paper"
                aria-expanded={openLevel === i}
              >
                <span className="font-mono text-sm text-muted w-6">{i + 1}</span>
                <span className="flex-1">
                  <span className="font-medium block">{level.title}</span>
                  <span className="text-sm text-muted">{level.summary}</span>
                </span>
                <span className="font-mono text-xs text-muted">
                  {level.lessons.length} lessons
                </span>
              </button>

              {openLevel === i && (
                <ul className="px-4 pb-4 pl-14 space-y-2">
                  {level.lessons.map((l) => (
                    <li key={l._id} className="flex items-baseline gap-3 text-sm">
                      <span className="text-muted">{l.title}</span>
                      <span className="font-mono text-xs text-muted">{l.minutes} min</span>
                    </li>
                  ))}
                  {level.project?.title && (
                    <li className="text-sm pt-2 border-t border-slate-line mt-3">
                      <span className="font-medium">Project: </span>
                      <span className="text-muted">{level.project.title}</span>
                    </li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
