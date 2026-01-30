export default function Input({ label, error, ...props }) {
  return (
    <label className="block">
      {label ? <div className="text-sm font-medium mb-2">{label}</div> : null}
      <input
        {...props}
        className={`w-full rounded-xl border px-3 py-2 outline-none transition
        ${error ? "border-red-500" : "border-neutral-300 focus:border-black"}`}
      />
      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </label>
  );
}
