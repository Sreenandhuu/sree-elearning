import { useEffect, useState } from 'react';
import { api } from '../api/client';
import RankMeter from '../components/RankMeter';
import { trackTone } from '../components/TrackBadge';

function Stat({ label, value, sub }) {
  return (
    <div className="panel p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
      {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
    </div>
  );
}

function LinkChild({ onLinked }) {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await api('/auth/link-child', {
        method: 'POST',
        body: { linkCode: code },
      });
      setMsg(res.message);
      setCode('');
      onLinked();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={submit} className="panel p-5 max-w-md">
      <h2 className="font-display text-lg font-bold">Link a child's account</h2>
      <p className="text-sm text-muted mt-1 mb-4">
        The code is on your child's profile. It looks like SREE01.
      </p>
      <div className="flex gap-2">
        <input
          className="field font-mono uppercase"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="SREE01"
          required
        />
        <button className="btn-primary shrink-0">Link account</button>
      </div>
      {msg && <p className="text-sm text-teal mt-3">{msg}</p>}
      {error && <p className="text-sm text-coral mt-3">{error}</p>}
    </form>
  );
}

export default function ParentDashboard() {
  const [children, setChildren] = useState([]);
  const [selected, setSelected] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadChildren = () =>
    api('/parent/children').then(({ children }) => {
      setChildren(children);
      if (children.length && !selected) setSelected(children[0].id);
      return children;
    });

  useEffect(() => {
    loadChildren().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    setReport(null);
    api(`/parent/children/${selected}/report`).then(setReport);
  }, [selected]);

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  if (!children.length) {
    return (
      <div>
        <h1 className="font-display text-4xl font-extrabold mb-6">My children</h1>
        <LinkChild onLinked={loadChildren} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold">My children</h1>

      {children.length > 1 && (
        <div className="flex gap-2 mt-5 flex-wrap">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`px-3 py-1.5 text-sm rounded-card border ${
                selected === c.id
                  ? 'bg-ink text-white border-ink'
                  : 'border-slate-line text-muted'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {!report ? (
        <p className="text-sm text-muted mt-6">Loading report…</p>
      ) : (
        <>
          <div className="mt-6">
            <h2 className="font-display text-2xl font-bold">
              {report.child.name}
              <span className="text-muted font-sans text-base font-normal ml-3">
                Age {report.child.age}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <Stat
              label="Learning time this week"
              value={`${Math.floor(report.summary.minutesThisWeek / 60)}h ${
                report.summary.minutesThisWeek % 60
              }m`}
            />
            <Stat label="Active courses" value={report.summary.activeCourses} />
            <Stat
              label="Class attendance"
              value={
                report.summary.attendancePercent === null
                  ? '—'
                  : `${report.summary.attendancePercent}%`
              }
              sub={
                report.summary.classesHeld
                  ? `${report.summary.classesAttended} of ${report.summary.classesHeld} classes`
                  : 'No classes yet'
              }
            />
            <Stat label="Projects reviewed" value={report.summary.projectsCompleted} />
          </div>

          <section className="mt-9">
            <h3 className="font-display text-lg font-bold mb-3">Progress by course</h3>
            <div className="space-y-4">
              {report.courses.map((c) => (
                <div key={c.id} className="panel p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="font-medium">
                      {c.course.emoji} {c.course.title}
                    </div>
                    <RankMeter
                      percent={c.percent}
                      cells={14}
                      tone={trackTone(c.course.track)}
                      label={`${c.course.title} progress`}
                    />
                  </div>
                  <p className="text-sm text-muted mt-2">
                    {c.lessonsDone} of {c.totalLessons} lessons
                    {c.lastQuiz && ` · last quiz ${c.lastQuiz.percent}%`}
                    {c.certificateIssuedAt && ' · certificate earned'}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-line space-y-2">
                    {c.skillProgress.map((s) => (
                      <div key={s.name} className="flex items-center justify-between gap-4">
                        <span className="text-sm w-28 shrink-0 text-muted">{s.name}</span>
                        <RankMeter
                          percent={s.percent}
                          cells={10}
                          tone={trackTone(c.course.track)}
                          label={s.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {report.nextClass && (
            <section className="mt-9">
              <h3 className="font-display text-lg font-bold mb-3">Next class</h3>
              <div className="panel p-5">
                <div className="font-medium">{report.nextClass.title}</div>
                <div className="text-sm text-muted mt-1">
                  {report.nextClass.course.emoji} {report.nextClass.course.title}
                </div>
                <div className="font-mono text-sm mt-2">
                  {new Date(report.nextClass.startsAt).toLocaleString(undefined, {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </section>
          )}

          <section className="mt-9">
            <h3 className="font-display text-lg font-bold mb-3">Teacher feedback</h3>
            {report.feedback.length ? (
              <div className="panel divide-y divide-slate-line">
                {report.feedback.map((f, i) => (
                  <div key={i} className="p-5">
                    <div className="text-sm font-medium">{f.title}</div>
                    <p className="text-sm text-muted mt-1.5 leading-relaxed">{f.feedback}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="panel p-5 text-sm text-muted">
                Feedback appears here once a teacher reviews a project.
              </p>
            )}
          </section>

          <section className="mt-9">
            <LinkChild onLinked={loadChildren} />
          </section>
        </>
      )}
    </div>
  );
}
