export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-[14px] border-l-4 border-l-[#E5E7EB] shadow-card p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="skeleton h-4 w-36 rounded" />
        <div className="skeleton h-5 w-24 rounded-full" />
      </div>
      {/* Mono number */}
      <div className="skeleton h-3 w-28 rounded" />
      {/* Stepper placeholder */}
      <div className="flex items-center gap-1 py-1">
        <div className="skeleton w-5 h-5 rounded-full" />
        <div className="skeleton flex-1 h-0.5" />
        <div className="skeleton w-5 h-5 rounded-full" />
        <div className="skeleton flex-1 h-0.5" />
        <div className="skeleton w-5 h-5 rounded-full" />
      </div>
      {/* Action box */}
      <div className="skeleton h-12 w-full rounded-md" />
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-3 w-32 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  );
}
