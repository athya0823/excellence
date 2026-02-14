import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { galleryItems } from "../data/gallery";

const easeOut = [0.16, 1, 0.3, 1];

export default function Gallery() {
  const reduce = useReducedMotion();

  const tags = useMemo(() => {
    const set = new Set((galleryItems || []).map((x) => x.tag).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, []);

  const [activeTag, setActiveTag] = useState("All");

  // Store active by index (more reliable than storing full object reference)
  const [activeIndex, setActiveIndex] = useState(-1);

  // ✅ Correct deps, stable filtering, no black/blank issue
  const filtered = useMemo(() => {
    const list = galleryItems || [];
    return activeTag === "All" ? list : list.filter((x) => x.tag === activeTag);
  }, [activeTag]);

  const active = activeIndex >= 0 ? filtered[activeIndex] : null;

  // ✅ When filter changes, close modal and reset index safely
  useEffect(() => {
    setActiveIndex(-1);
  }, [activeTag]);

  // Lightbox controls
  const close = useCallback(() => setActiveIndex(-1), []);
  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (filtered.length === 0) return -1;
      const ni = i + 1;
      return ni >= filtered.length ? 0 : ni;
    });
  }, [filtered.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (filtered.length === 0) return -1;
      const pi = i - 1;
      return pi < 0 ? filtered.length - 1 : pi;
    });
  }, [filtered.length]);

  // ✅ ESC + arrows support
  useEffect(() => {
    function onKeyDown(e) {
      if (activeIndex < 0) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, next, prev]);

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    exit: { opacity: 0, y: reduce ? 0 : 10, transition: { duration: 0.18 } },
  };

  const viewport = { once: true, amount: 0.2 };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10">
          <Container className="py-10 sm:py-14 md:py-16 text-white">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <Badge variant="accent">Gallery</Badge>
                  <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                    Campus & Classroom Moments
                  </h1>
                  <p className="mt-4 text-white/90 leading-relaxed max-w-2xl">
                    A glimpse of our classrooms, infrastructure, and learning environment.
                  </p>

                  <div className="mt-3 text-xs text-white/80">
                    Showing <span className="font-semibold">{filtered.length}</span>{" "}
                    {filtered.length === 1 ? "photo" : "photos"}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Link to="/admission" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-brand-primary hover:text-black hover:bg-white transition">
                      Enquire Now
                    </Button>
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto text-center rounded-xl px-4 py-2 text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="mt-7 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold border transition
                      ${
                        activeTag === t
                          ? "bg-white text-black border-white"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/15"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* GRID */}
      <section className="py-10 sm:py-12">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-surface-muted p-6 text-text-body">
              No images found for this tag.
            </div>
          ) : (
            <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/*  AnimatePresence fixes re-filter blank/flicker */}
              <AnimatePresence mode="popLayout">
                {filtered.map((item, idx) => (
                  <motion.button
                    key={String(item.id)} // ✅ stable key fixes issues
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    viewport={viewport}
                    onClick={() => setActiveIndex(idx)}
                    className="group rounded-3xl border border-neutral-200 bg-white overflow-hidden text-left hover:shadow-soft transition"
                  >
                    <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-text-heading line-clamp-1">
                          {item.title}
                        </div>
                        <span className="text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1">
                          {item.tag}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-text-muted">
                        Tap to preview
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="w-full max-w-5xl"
              initial={{ scale: reduce ? 1 : 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduce ? 1 : 0.98, opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 gap-3">
                <div className="text-white font-semibold truncate">
                  {active.title}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
                    title="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
                    title="Next"
                  >
                    →
                  </button>
                  <button
                    onClick={close}
                    className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
                  >
                    Close ✕
                  </button>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden bg-black">
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="mt-3 text-white/80 text-xs">
                Tip: Use keyboard → <span className="font-semibold">← →</span> to navigate,{" "}
                <span className="font-semibold">Esc</span> to close.
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-0 flex items-end justify-end p-6 opacity-[0.1] select-none">
        <div className="text-right text-xs sm:text-sm md:text-base font-semibold tracking-widest text-white">
          @Unknown number<br />
          @~Hruday Pandit
        </div>
      </div>
    </div>
  );
}
