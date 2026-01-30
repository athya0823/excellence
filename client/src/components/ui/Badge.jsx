export default function Badge({ children, variant = "primary" }) {
  const base =
    "inline-flex items-center rounded-full px-4 py-1.5 text-sm md:text-base font-bold tracking-wide";

  const variants = {
    primary: "bg-black text-white",
    outline: "border-2 border-black text-black bg-white",
    accent:
      "bg-gradient-to-r from-indigo-600 to-green-600 text-white shadow-sm"
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
