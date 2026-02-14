import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import TopperCard from "../components/results/TopperCard";
import { resultsByYear } from "../data/results";
import results2025Banner from "../assets/results/thumbnail.png";

const easeOut = [0.16, 1, 0.3, 1];

export default function Results() {
  const reduce = useReducedMotion();

  //  filter logic
  const years = useMemo(() => resultsByYear.map((x) => x.year), []);
  const [activeYear, setActiveYear] = useState(years[0]);

  //  filter logic
  const active =
    resultsByYear.find((x) => x.year === activeYear) || resultsByYear[0];

  //  NEW: reveal/collapse topper section
  const [open, setOpen] = useState(false);
  const resultsRef = useRef(null);

  // When year changes, keep section closed
  useEffect(() => {
    setOpen(false);
  }, [activeYear]);

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };

  function openResults() {
    setOpen(true);
    // smooth scroll after animation tick
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <div className="bg-white">
      {/* MARKETING HERO */}
      
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative py-10 sm:py-14 md:py-16 text-white">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              {/* Left */}
              <motion.div variants={fadeUp} className="lg:col-span-7">
                <Badge variant="accent">Results & Toppers</Badge>

                <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  NEET Selections That Speak For Themselves
                </h1>

                <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                  Explore year-wise NEET results, toppers, and highlights. Tap a year,
                  then view the topper list for that batch.
                </p>

                {/* Year chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {years.map((y) => {
                    const activeChip = activeYear === y;
                    return (
                      <button
                        key={y}
                        onClick={() => setActiveYear(y)}
                        className={[
                          "rounded-xl px-4 py-2 text-sm font-semibold border transition",
                          activeChip
                            ? "bg-white text-black border-white"
                            : "bg-white/10 text-white border-white/20 hover:bg-white/15",
                        ].join(" ")}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>

                {/* CTA row */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    onClick={openResults}
                    className="w-full sm:w-auto bg-brand-primary hover:text-black hover:bg-white transition"
                  >
                    View Results {activeYear} →
                  </Button>

                  <Link to="/admission" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto rounded-xl px-4 py-2 text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition">
                      Enquire Now
                    </button>
                  </Link>
                </div>

                {/* Micro trust strip */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                  <Highlight title="Concept First" value="NCERT Focus" note="(Core)" />
                  <Highlight title="Tests" value="Weekly + Analysis" note="(System)" />
                  <Highlight title="Mentoring" value="Small Batches" note="(40–50)" />
                </div>
              </motion.div>

              {/* Right: Featured Year Card */}
              <motion.div variants={fadeUp} className="lg:col-span-5">
                <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-white/10">
                    <div className="text-xs font-semibold text-white/80">
                      Featured Year
                    </div>
                    <div className="mt-1 text-2xl font-extrabold">
                      {active.year}
                    </div>
                    <div className="mt-2 text-sm text-white/85 leading-relaxed">
                      <span className="font-semibold">{active.headline}</span>
                      <span className="text-white/80"> — {active.summary}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill text={`${active.toppers?.length || 0} Toppers`} />
                      <Pill text="Year-wise Verified UI" />
                      <Pill text="Tap to Reveal" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={openResults}
                    className="w-full text-left p-5 sm:p-6 hover:bg-white/5 transition"
                  >
                    <div className="text-sm font-semibold">
                      View topper list for {active.year}
                    </div>
                    <div className="mt-1 text-xs text-white/70">
                      Tap to open the section below
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* REVEAL SECTION (hidden until CTA) */}
      <div ref={resultsRef} />

      <AnimatePresence>
        {open ? (
          <motion.section
            key={String(active.year)}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="border-b border-neutral-200 bg-neutral-50"
          >
            <Container className="py-10 sm:py-12">
              {/* Header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-neutral-600">
                    NEET Results {active.year}
                  </div>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold text-text-heading">
                    {active.headline}
                  </h2>
                  <p className="mt-2 text-sm text-text-body max-w-2xl leading-relaxed">
                    {active.summary}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full sm:w-auto rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 bg-white hover:bg-neutral-50 transition"
                  >
                    Hide Results
                  </button>
                  <Link to="/admission" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white transition">
                      Admission / Enquiry
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Spotlight Carousel */}
              <div className="mt-7">
                <SpotlightCarousel year={active.year} toppers={active.toppers} />
              </div>


              {/* Topper Cards */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 },
                  },
                }}
                className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {(active.toppers || []).map((t) => (
                  <motion.div
                    key={`${active.year}-${t.name}-${t.rank}`}
                    variants={{
                      hidden: { opacity: 0, y: reduce ? 0 : 12 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: easeOut },
                      },
                    }}
                  >
                    <div className="group">
                      {/* wrapper adds hover polish without editing TopperCard */}
                      <div className="rounded-3xl hover:shadow-soft transition-transform duration-300 group-hover:-translate-y-1">
                        <TopperCard topper={t} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Banner only shown when year is 2025 (same behavior) */}
              {Number(active.year) === 2025 && (
                <motion.div
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="mt-10 rounded-3xl border border-neutral-200 bg-white p-4 md:p-6 shadow-soft"
                >
                  {/* Tap to zoom-like preview */}
                  <details className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-text-heading">
                            NEET {active.year} Result Banner
                          </div>
                          <div className="mt-1 text-sm text-text-muted">
                            Tap to view banner
                          </div>
                        </div>
                        <span className="text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1">
                          Tap to open
                        </span>
                      </div>
                    </summary>

                    <div className="mt-4">
                      <img
                        src={results2025Banner}
                        alt="NEET 2025 Results - NEET Excellence Medical Academy"
                        className="w-full rounded-2xl object-contain"
                      />
                    </div>
                  </details>
                </motion.div>
              )}

              {/* Note */}
              <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700">
                <span className="font-semibold">Note:</span> This is temporary data
                for UI approval. Once final list + photos are shared, we’ll update it.
              </div>
            </Container>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-10 sm:py-12 bg-white">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-soft transition">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-text-heading">
                Want to be a Topper?
              </div>
              <div className="mt-2 text-text-body">
                Join our NEET programs and get structured guidance + testing.
              </div>
            </div>
            <Link to="/admission" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-brand-primary rounded-xl border border-neutral-300 hover:text-black hover:bg-white transition">
                Enquire Now
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      {/* Watermark */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-end justify-end p-6 opacity-[0.1] select-none">
        <div className="text-right text-xs sm:text-sm md:text-base font-semibold tracking-widest text-white">
          @Unknown number<br />
          @~Hruday Pandit
        </div>
      </div>

    </div>
  );
}

function Highlight({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-4">
      <div className="text-xs font-semibold text-white/80">{title}</div>
      <div className="mt-2 text-base font-bold text-white">
        {value} <span className="text-xs font-semibold text-white/70">{note}</span>
      </div>
      <div className="mt-2 text-xs text-white/70">Marketing highlight</div>
    </div>
  );
}

function Pill({ text }) {
  return (
    <span className="text-xs font-semibold rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90">
      {text}
    </span>
  );
}

function SpotlightCarousel({ year, toppers = [] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // reset when year changes or toppers changes
  useEffect(() => {
    setIndex(0);
  }, [year, toppers?.length]);

  const total = toppers.length;
  const current = toppers[index];

  function prev() {
    if (!total) return;
    setIndex((p) => (p - 1 + total) % total);
  }
  function next() {
    if (!total) return;
    setIndex((p) => (p + 1) % total);
  }

  if (!total) return null;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden hover:shadow-soft transition">
      {/* header */}
      <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-neutral-600">Topper Spotlight</div>
          <div className="mt-1 text-lg sm:text-xl font-bold text-text-heading">
            NEET {year} — Featured Topper
          </div>
          <div className="mt-1 text-sm text-text-muted">
            Swipe on mobile or use arrows
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="h-10 w-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 transition flex items-center justify-center"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="h-10 w-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 transition flex items-center justify-center"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* slide */}
      <div className="p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
          {/* big card */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl border border-neutral-200 bg-neutral-50 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${year}-${index}`}
                  initial={{ opacity: 0, x: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : -16 }}
                  transition={{ duration: 0.25 }}
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(e, info) => {
                    if (reduce) return;
                    const dx = info.offset.x;
                    if (dx > 60) prev();
                    else if (dx < -60) next();
                  }}
                  className="p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-neutral-600">
                        {current?.name || "Topper"}
                      </div>
                      <div className="mt-1 text-2xl font-bold text-text-heading">
                        {current?.rank ? `AIR ${current.rank}` : "Top Rank"}
                      </div>
                      <div className="mt-2 text-sm text-text-body">
                        {current?.score ? `Score: ${current.score}` : "Score details"}
                        {current?.college ? ` • ${current.college}` : ""}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-xs font-semibold rounded-full border border-neutral-200 bg-white px-3 py-1">
                        Spotlight
                      </span>
                      <span className="text-xs font-semibold rounded-full border border-neutral-200 bg-white px-3 py-1">
                        {index + 1}/{total}
                      </span>
                    </div>
                  </div>

                  {/* optional quote/desc if you have it */}
                  {current?.message ? (
                    <div className="mt-4 text-sm text-neutral-700 leading-relaxed">
                      “{current.message}”
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-neutral-700 leading-relaxed">
                      Consistent testing + analysis + strong NCERT base.
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#yearwise"
                      className="w-full sm:w-auto text-center rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 bg-white hover:bg-neutral-50 transition"
                    >
                      View All Toppers
                    </a>
                    <Link to="/admission" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto rounded-xl px-4 py-2 text-sm text-white font-semibold bg-brand-primary border border-neutral-300 hover:bg-white hover:text-black transition">
                        Join the Program
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* dots */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              {toppers.map((_, i) => {
                const activeDot = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={[
                      "h-2.5 rounded-full transition",
                      activeDot ? "w-10 bg-brand-primary" : "w-2.5 bg-neutral-300 hover:bg-neutral-400",
                    ].join(" ")}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* side mini list */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden">
              <div className="p-4 border-b border-neutral-200">
                <div className="text-sm font-bold text-text-heading">Quick Picks</div>
                <div className="text-xs text-text-muted mt-1">
                  Tap a name to spotlight
                </div>
              </div>

              <div className="max-h-[260px] overflow-auto">
                {toppers.map((t, i) => (
                  <button
                    key={`${year}-${t?.name}-${t?.rank}-${i}`}
                    onClick={() => setIndex(i)}
                    className={[
                      "w-full text-left px-4 py-3 border-b border-neutral-100 transition",
                      i === index ? "bg-neutral-50" : "hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-sm text-text-heading truncate">
                        {t?.name || "Topper"}
                      </div>
                      <span className="text-xs font-semibold rounded-full border border-neutral-200 px-2 py-0.5">
                        {t?.rank ? `AIR ${t.rank}` : "Rank"}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-text-muted truncate">
                      {t?.score ? `Score: ${t.score}` : "Tap to view"}
                      {t?.college ? ` • ${t.college}` : ""}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* mobile arrows */}
            <div className="mt-4 flex sm:hidden gap-2">
              <button
                type="button"
                onClick={prev}
                className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50 transition"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={next}
                className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50 transition"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

