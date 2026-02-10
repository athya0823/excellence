import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import { courses } from "../data/courses";
import class1Img from "../assets/course/class-1.jpg";

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
    <div>
      {/* Header strip */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
    <div className="absolute inset-0 bg-black/60" />
    <div className="relative z-10">
        <Container className="py-14 text-white">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Badge variant="accent">Courses</Badge>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                Programs at NEET Excellence Medical Academy
              </h1>
              {/* <p className="mt-3 text-sm md:text-base text-text-body max-w-2xl">
                Temporary course data for Phase-1 UI. Admin management will come later.
              </p> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full sm:w-64 rounded-xl border text-black border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
              />
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full sm:w-48 rounded-xl border text-black border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
              >
                {badges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Container>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="rounded-2xl border border-neutral-200 bg-white hover:shadow-soft transition overflow-hidden"
              >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={class1Img}
                  alt="Class 1"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
          
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold text-text-heading leading-snug">
                      {c.title}
                    </div>
                    <Badge variant="outline">{c.badge}</Badge>
                  </div>

                  <div className="mt-2 text-sm text-text-body leading-relaxed line-clamp-3">
                    {c.description}
                  </div>

                  <div className="mt-4 text-xs text-text-muted">
                    {c.duration} • {c.mode}
                  </div>

                  <div className="mt-5 inline-flex items-center text-sm font-semibold text-brand-primary underline underline-offset-4">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-neutral-200 bg-surface-muted p-6 text-text-body">
              No courses found. Try changing the filter or search keyword.
            </div>
          ) : null}
        </Container>
      </section>
    </div>
  );
}
