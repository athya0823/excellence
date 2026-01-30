import Badge from "../ui/Badge";

export default function TopperCard({ topper }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-sm transition">
      {/* Photo placeholder */}
      <div className="h-40 bg-neutral-100 flex items-center justify-center">
        {topper.photo ? (
          <img
            src={topper.photo}
            alt={topper.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-xs text-neutral-500">Student Photo</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold">{topper.name}</div>
            <div className="mt-1 text-xs text-neutral-500">{topper.college}</div>
          </div>
          <Badge>{topper.rank}</Badge>
        </div>

        <div className="mt-3 text-sm text-neutral-700">
          <span className="font-semibold">Score:</span> {topper.score}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>NEET Result</span>
          <span className="underline underline-offset-4">View Details</span>
        </div>
      </div>
    </div>
  );
}
