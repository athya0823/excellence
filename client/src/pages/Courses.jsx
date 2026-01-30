import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import { courses } from "../data/courses";

export default function Courses() {
  const [query, setQuery] = useState("");
  const [badge, setBadge] = useState("All");

  const badges = useMemo(() => {
    const set = new Set(courses.map((c) => c.badge));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesBadge = badge === "All" ? true : c.badge === badge;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchesBadge && matchesQuery;
    });
  }, [query, badge]);

  return (
    <Container className="py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Temporary course data for Phase-1 UI. Admin management will come later.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <select
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
          >
            {badges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            to={`/courses/${c.slug}`}
            className="rounded-2xl border border-neutral-200 bg-white hover:shadow-sm transition overflow-hidden"
          >
            <div className="h-36 bg-neutral-100" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">{c.title}</div>
                <Badge>{c.badge}</Badge>
              </div>
              <div className="mt-2 text-sm text-neutral-600">{c.description}</div>
              <div className="mt-4 text-xs text-neutral-500">
                {c.duration} • {c.mode}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
