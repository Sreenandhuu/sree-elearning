/**
 * Progress drawn as discrete cells — the rank of a chessboard.
 * Used for every kind of progress in the product so the idea stays consistent.
 */
export default function RankMeter({ percent = 0, cells = 10, tone = 'teal', label }) {
  const filled = Math.round((percent / 100) * cells);
  const tones = {
    teal: 'bg-teal',
    brass: 'bg-brass',
    violet: 'bg-violet',
    coral: 'bg-coral',
    ink: 'bg-ink',
  };

  return (
    <div
      className="flex items-center gap-3"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || 'Progress'}
    >
      <div className="flex gap-[3px]" aria-hidden="true">
        {Array.from({ length: cells }, (_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 ${
              i < filled ? tones[tone] : 'bg-slate-line'
            }`}
          />
        ))}
      </div>
      <span className="font-mono text-xs text-muted tabular-nums">{percent}%</span>
    </div>
  );
}
