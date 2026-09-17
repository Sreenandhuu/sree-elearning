const tracks = {
  chess: { label: 'Chess', tone: 'text-ink border-ink' },
  webdev: { label: 'Web', tone: 'text-teal border-teal' },
  aiml: { label: 'AI', tone: 'text-violet border-violet' },
  cyber: { label: 'Security', tone: 'text-coral border-coral' },
};

export default function TrackBadge({ track }) {
  const t = tracks[track] || { label: track, tone: 'text-muted border-slate-line' };
  return (
    <span className={`inline-block border px-2 py-0.5 text-xs font-medium ${t.tone}`}>
      {t.label}
    </span>
  );
}

export const trackTone = (track) =>
  ({ chess: 'ink', webdev: 'teal', aiml: 'violet', cyber: 'coral' }[track] || 'teal');
