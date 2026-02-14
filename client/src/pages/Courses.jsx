import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import { courses } from "../data/courses";
import class1Img from "../assets/course/class-1.jpg";

const easeOut = [0.16, 1, 0.3, 1];

export default function Courses() {
  const [query, setQuery] = useState("");
  const [badge, setBadge] = useState("All");
  const reduce = useReducedMotion();

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

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
    exit: { opacity: 0, y: reduce ? 0 : 8, transition: { duration: 0.2 } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.02 } },
  };

  // IMPORTANT: this key forces grid remount when filters change (prevents stuck hidden state)
  const gridKey = `${badge}__${query.trim().toLowerCase()}`;

  return (
    <div className="bg-white">
      {/* HEADER / HERO STRIP */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative py-10 sm:py-14 md:py-16 text-white">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.div variants={fadeUp}>
                <Badge variant="accent">Courses</Badge>
                <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Programs at NEET Excellence Medical Academy
                </h1>
                <p className="mt-3 text-sm sm:text-base text-neutral-200 max-w-2xl">
                  Explore our NEET-focused programs designed for concept clarity, discipline, and results.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="w-full lg:w-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-[520px]">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
                  />
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
                  >
                    {badges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3 text-xs text-neutral-200">
                  Showing <span className="font-semibold">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "course" : "courses"}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-10 sm:py-12">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-surface-muted p-6 text-text-body">
              No courses found. Try changing the filter or search keyword.
            </div>
          ) : (
            <motion.div
              key={gridKey}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((c) => (
                  <motion.div key={c.slug} variants={fadeUp} layout exit="exit">
                    <Link
                      to={`/courses/${c.slug}`}
                      className="group block rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-soft transition"
                    >
                      {/* image */}
                      <div className="relative h-40 sm:h-44 overflow-hidden">
                        <img
                          src={class1Img}
                          alt={c.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* top-right badge */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline">{c.badge}</Badge>
                        </div>
                      </div>

                      {/* content */}
                      <div className="p-5">
                        <div className="font-bold text-text-heading leading-snug">
                          {c.title}
                        </div>

                        <div className="mt-2 text-sm text-text-body leading-relaxed line-clamp-3">
                          {c.description}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted">
                          <span className="rounded-full border border-neutral-200 px-2 py-1">
                            {c.duration}
                          </span>
                          <span className="rounded-full border border-neutral-200 px-2 py-1">
                            {c.mode}
                          </span>
                        </div>

                        <div className="mt-5 inline-flex items-center text-sm font-semibold text-brand-primary underline underline-offset-4">
                          View Details →
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </section>

      {/* watermark */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-end justify-end p-6 opacity-[0.1] select-none">
        <div className="text-right text-xs sm:text-sm md:text-base font-semibold tracking-widest text-white">
          @Unknown number<br />
          @~Hruday Pandit
        </div>
      </div>
    </div>
  );
}
