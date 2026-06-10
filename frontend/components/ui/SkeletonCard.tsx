export default function SkeletonCard() {
  return (
    <div className="bg-surface rounded-lg border-l-4 border-l-border shadow-card p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="skeleton h-4 w-36 rounded-sm" />
        <div className="skeleton h-5 w-24 rounded-full" />
      </div>
      <div className="skeleton h-3 w-28 rounded-sm" />
      <div className="flex items-center gap-1 py-1">
        <div className="skeleton w-5 h-5 rounded-full" />
        <div className="skeleton flex-1 h-0.5" />
        <div className="skeleton w-5 h-5 rounded-full" />
        <div className="skeleton flex-1 h-0.5" />
        <div className="skeleton w-5 h-5 rounded-full" />
      </div>
      <div className="skeleton h-12 w-full rounded-md" />
      <div className="flex items-center justify-between">
        <div className="skeleton h-3 w-32 rounded-sm" />
        <div className="skeleton h-3 w-20 rounded-sm" />
      </div>
    </div>
  );
}