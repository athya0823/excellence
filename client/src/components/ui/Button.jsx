export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold
      bg-black text-white hover:opacity-90 active:opacity-80 transition ${className}`}
    >
      {children}
    </button>
  );
}
