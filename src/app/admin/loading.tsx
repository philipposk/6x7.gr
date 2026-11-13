// Shown instantly while an admin page loads its data (the header/nav stay visible).
export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => <div key={i} className="h-20 rounded-lg border border-neutral-800 bg-neutral-900" />)}
      </div>
      <div className="h-64 rounded-lg border border-neutral-800 bg-neutral-900" />
    </div>
  );
}
