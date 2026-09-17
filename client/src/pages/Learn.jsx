import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import RankMeter from '../components/RankMeter';
import { trackTone } from '../components/TrackBadge';

function Quiz({ level, enrollmentId, onDone }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const questions = level.quiz?.questions || [];
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  async function submit() {
    setBusy(true);
    try {
      const res = await api(`/enrollments/${enrollmentId}/quiz`, {
        method: 'POST',
        body: {
          levelId: level._id,
          answers: questions.map((_, i) => answers[i]),
        },
      });
      setResult(res);
      onDone?.();
    } finally {
      setBusy(false);
    }
  }

  if (!questions.length) return null;

  return (
    <div className="panel p-6 mt-6">
      <h3 className="font-display text-lg font-bold">{level.quiz.title}</h3>
      <p className="text-sm text-muted mt-1 mb-5">
        {questions.length} questions. You need {level.quiz.passScore || 70}% to pass.
      </p>

      <ol className="space-y-6">
        {questions.map((q, i) => {
          const r = result?.results?.[i];
          return (
            <li key={q._id}>
              <p className="font-medium mb-3">
                <span className="font-mono text-muted mr-2">{i + 1}.</span>
                {q.prompt}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const picked = answers[i] === oi;
                  let tone = 'border-slate-line';
                  if (result) {
                    if (oi === r.correctIndex) tone = 'border-teal bg-teal/5';
                    else if (picked) tone = 'border-coral bg-coral/5';
                  } else if (picked) {
                    tone = 'border-ink bg-paper';
                  }
                  return (
                    <label
                      key={oi}
                      className={`flex items-center gap-3 border px-3 py-2 rounded-card text-sm cursor-pointer ${tone}`}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        checked={picked}
                        disabled={!!result}
                        onChange={() => setAnswers({ ...answers, [i]: oi })}
                        className="accent-teal"
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
              {r && (
                <p className="text-sm text-muted mt-2 pl-1">{r.explanation}</p>
              )}
            </li>
          );
        })}
      </ol>

      {result ? (
        <div className="mt-6 pt-5 border-t border-slate-line">
          <p className="font-display text-xl font-bold">
            {result.score} out of {result.total}
          </p>
          <p className="text-sm text-muted mt-1">
            {result.passed
              ? 'Passed. On to the next level.'
              : 'Not passed yet. Go back over the lessons and try again.'}
          </p>
        </div>
      ) : (
        <button className="btn-primary mt-6" onClick={submit} disabled={!allAnswered || busy}>
          {busy ? 'Checking…' : 'Check my answers'}
        </button>
      )}
    </div>
  );
}

export default function Learn() {
  const { enrollmentId } = useParams();
  const [data, setData] = useState(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () =>
    api(`/enrollments/${enrollmentId}`).then((res) => {
      setData(res);
      return res;
    });

  useEffect(() => {
    load();
  }, [enrollmentId]);

  if (!data) return <p className="text-sm text-muted">Loading…</p>;

  const { enrollment, percent } = data;
  const course = enrollment.course;
  const level = course.levels[levelIndex];
  const done = new Set(enrollment.completedLessons.map(String));
  const tone = trackTone(course.track);

  async function markDone(lesson) {
    setSaving(true);
    try {
      await api(`/enrollments/${enrollmentId}/lessons`, {
        method: 'POST',
        body: { lessonId: lesson._id, minutes: lesson.minutes },
      });
      await load();
      setActiveLesson(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-extrabold">
            {course.emoji} {course.title}
          </h1>
          <p className="text-sm text-muted mt-1">
            {enrollment.completedLessons.length} lessons done ·{' '}
            {Math.round(enrollment.minutesLearned / 60)}h {enrollment.minutesLearned % 60}m spent
          </p>
        </div>
        <RankMeter percent={percent} cells={16} tone={tone} label="Course progress" />
      </div>

      {enrollment.certificateIssuedAt && (
        <div className="panel p-5 mt-6 border-l-4 border-l-brass">
          <p className="font-display text-lg font-bold">Track finished</p>
          <p className="text-sm text-muted mt-1">
            Certificate issued on{' '}
            {new Date(enrollment.certificateIssuedAt).toLocaleDateString()}.
          </p>
        </div>
      )}

      <nav className="flex gap-2 mt-7 overflow-x-auto pb-1">
        {course.levels.map((l, i) => {
          const lessonsDone = l.lessons.filter((ls) => done.has(String(ls._id))).length;
          return (
            <button
              key={l._id}
              onClick={() => {
                setLevelIndex(i);
                setActiveLesson(null);
              }}
              className={`px-3 py-2 text-sm rounded-card border whitespace-nowrap ${
                i === levelIndex
                  ? 'border-ink bg-ink text-white'
                  : 'border-slate-line text-muted hover:text-ink'
              }`}
            >
              Level {i + 1}
              <span className="font-mono text-xs ml-2 opacity-70">
                {lessonsDone}/{l.lessons.length}
              </span>
            </button>
          );
        })}
      </nav>

      <section className="mt-6">
        <h2 className="font-display text-xl font-bold">{level.title}</h2>
        <p className="text-sm text-muted mt-1">{level.summary}</p>

        <ol className="panel divide-y divide-slate-line mt-4">
          {level.lessons.map((lesson, i) => {
            const isDone = done.has(String(lesson._id));
            const isOpen = activeLesson === lesson._id;
            return (
              <li key={lesson._id}>
                <button
                  onClick={() => setActiveLesson(isOpen ? null : lesson._id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-paper"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`h-5 w-5 shrink-0 border flex items-center justify-center text-xs ${
                      isDone ? 'bg-teal border-teal text-white' : 'border-slate-line'
                    }`}
                    aria-hidden="true"
                  >
                    {isDone ? '✓' : ''}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`block ${isDone ? 'text-muted' : 'font-medium'}`}>
                      {lesson.title}
                    </span>
                    <span className="text-xs text-muted">
                      {lesson.type === 'challenge' ? 'Challenge' : 'Lesson'} ·{' '}
                      {lesson.minutes} min
                      {lesson.skill ? ` · ${lesson.skill}` : ''}
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 ml-9">
                    <div className="bg-ink text-paper/50 rounded-card aspect-video flex items-center justify-center text-sm">
                      {lesson.videoUrl ? (
                        <video src={lesson.videoUrl} controls className="w-full h-full" />
                      ) : (
                        'Lesson video goes here'
                      )}
                    </div>
                    {lesson.content && (
                      <p className="text-sm mt-4 leading-relaxed max-w-prose">{lesson.content}</p>
                    )}
                    {!isDone && (
                      <button
                        className="btn-primary mt-4"
                        onClick={() => markDone(lesson)}
                        disabled={saving}
                      >
                        {saving ? 'Saving…' : 'Mark as done'}
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {level.project?.title && (
          <div className="panel p-5 mt-6">
            <h3 className="font-display text-lg font-bold">Project: {level.project.title}</h3>
            <p className="text-sm text-muted mt-2 leading-relaxed max-w-prose">
              {level.project.brief}
            </p>
          </div>
        )}

        <Quiz level={level} enrollmentId={enrollmentId} onDone={load} />
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold mb-3">Skill map</h2>
        <div className="panel p-5 space-y-3">
          {enrollment.skillProgress.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-4">
              <span className="text-sm w-28 shrink-0">{s.name}</span>
              <RankMeter percent={s.percent} cells={10} tone={tone} label={s.name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
