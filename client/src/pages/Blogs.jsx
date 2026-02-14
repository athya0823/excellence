import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";

const easeOut = [0.16, 1, 0.3, 1];

// ✅ Add category so tabs can work (you can adjust these)
const blogs = [
  {
    title: "The Final Leap – Turning Tests into Success (NEET UG)",
    desc:
      "After every test, students experience a mix of anxiety, self-analysis, and speculation. The Final Leap explains how to convert test performance into meaningful improvement instead of stress. This article focuses on post-test analysis, emotional control, mistake tracking, and mindset correction, helping NEET aspirants take the final decisive step toward success.",
    keywords: "NEET test analysis, post-test strategy, NEET mindset, exam improvement",
    category: "Strategy",
  },
  {
    title: "NEET Preparation Strategy for Repeaters (Droppers)",
    desc:
      "Repeaters need a different approach, not the same routine repeated again. This blog outlines a time-tested NEET repeater strategy, focusing on Physics & Chemistry concept rebuilding, structured revision, time management, and avoiding past mistakes. Ideal for students aiming at rank improvement.",
    keywords: "NEET repeater strategy, dropper NEET preparation, rank improvement NEET",
    category: "Repeaters",
  },
  {
    title: "How to Score a Perfect 360 in NEET Biology",
    desc:
      "Biology contributes the maximum weightage in NEET UG. This article explains a systematic NCERT-first approach, covering diagrams, keywords, repeated revisions, and MCQ-based learning to help students aim for 360/360 in Biology.",
    keywords: "NEET Biology preparation, score 360 Biology, NCERT Biology NEET",
    category: "Biology",
  },
  {
    title: "How to Score Good Marks in NEET UG",
    desc:
      "Scoring well in NEET is about balanced preparation, not overworking one subject. This blog explains smart subject prioritisation, revision cycles, MCQ practice, and test analysis, helping students improve overall marks across Physics, Chemistry, and Biology.",
    keywords: "how to score in NEET, NEET study plan, NEET UG strategy",
    category: "Strategy",
  },
  {
    title: "How to Complete the NEET Syllabus on Time",
    desc:
      "Many students struggle with incomplete syllabi. This article presents a realistic, time-bound NEET syllabus completion plan, including weekly targets, revision slots, and test integration—ensuring students finish early and revise multiple times.",
    keywords: "complete NEET syllabus, NEET time management, NEET planning",
    category: "Planning",
  },
  {
    title: "Tips & Techniques to Amplify Physics Scores in NEET",
    desc:
      "Physics is often the biggest challenge for NEET aspirants. This blog focuses on interlinking chapters, concept clarity, numerical practice, and formula application, helping students overcome fear and boost Physics scores.",
    keywords: "NEET Physics tips, improve Physics score NEET, NEET numericals",
    category: "Physics",
  },
  {
    title: "Importance of NEET in MBBS Admission",
    desc:
      "NEET is the single gateway to MBBS in India. This article explains the role of NEET in medical admissions, eligibility, competition level, and why structured preparation is essential for securing a government medical seat.",
    keywords: "importance of NEET, NEET for MBBS, medical entrance exam India",
    category: "Awareness",
  },
  {
    title: "How Do NEET Toppers Study?",
    desc:
      "NEET toppers don’t study longer — they study smarter. This blog highlights toppers’ habits, including consistency, revision techniques, mock test usage, and mistake analysis that average students often ignore.",
    keywords: "NEET toppers strategy, how toppers study NEET, NEET success habits",
    category: "Motivation",
  },
  {
    title: "NEET Exam Pattern Explained (Latest Format)",
    desc:
      "Understanding the NEET exam pattern is critical for effective preparation. This article explains paper structure, marking scheme, subject-wise distribution, and exam mode, helping students align their preparation with actual exam requirements.",
    keywords: "NEET exam pattern, NEET marking scheme, NEET UG structure",
    category: "Exam",
  },
  {
    title: "5 Mistakes You Must Avoid During NEET Preparation",
    desc:
      "Even hardworking students fail due to avoidable mistakes. This blog discusses the top 5 NEET preparation errors, including ignoring NCERT, poor revision, lack of testing, and unrealistic planning.",
    keywords: "NEET mistakes, NEET preparation errors, avoid failure in NEET",
    category: "Mistakes",
  },
  {
    title: "NEET Tips: Study Long Hours Without Fatigue",
    desc:
      "NEET demands long study hours, but burnout reduces efficiency. This article shares scientific and practical tips to improve concentration, stamina, and productivity without mental exhaustion.",
    keywords: "study long hours NEET, NEET fatigue management, focus tips NEET",
    category: "Productivity",
  },
  {
    title: "A Teacher vs A Coach – What NEET Aspirants Need",
    desc:
      "There’s a big difference between teaching concepts and coaching for competition. This blog explains why NEET aspirants need mentors who focus on application, testing, and exam temperament, not just theory.",
    keywords: "teacher vs coach NEET, NEET coaching importance, exam mentorship",
    category: "Guidance",
  },
];

export default function Blogs() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  // ✅ tabs like faculty page
  const tabs = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category || "General"));
    return ["All", ...Array.from(set)];
  }, []);

  // ✅ safe filter (no stale memo / no blank issue)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = blogs;

    return list.filter((b) => {
      const cat = b.category || "General";
      const matchesTab = tab === "All" ? true : cat === tab;

      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q) ||
        b.keywords.toLowerCase().includes(q);

      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

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

        <Container className="relative py-10 sm:py-14 md:py-16 text-white">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <Badge variant="accent">Blog</Badge>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Latest Articles
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              NEET-focused strategies, tips, and guidance.
            </p>

            {/* Search */}
            <div className="mt-7 max-w-xl">
              <label className="text-xs font-semibold text-white/80">Search articles</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, topic, keywords..."
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10"
              />
              <div className="mt-2 text-xs text-white/70">
                Showing <span className="font-semibold text-white">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "article" : "articles"}
              </div>
            </div>

            {/* Tabs like faculty */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold border transition
                    ${
                      tab === t
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
      </section>

      {/* GRID */}
      <section className="py-10 sm:py-12">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-surface-muted p-6 text-text-body">
              No articles found. Try another keyword or category.
            </div>
          ) : (
            <motion.div layout className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* ✅ fixes 2nd-time blank issue */}
              <AnimatePresence mode="popLayout">
                {filtered.map((b) => (
                  <motion.div
                    key={b.title} // stable key
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    viewport={viewport}
                  >
                    <BlogCard b={b} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </section>
      <div className="pointer-events-none fixed inset-0 z-0 flex items-end justify-end p-6 opacity-[0.1] select-none">
        <div className="text-right text-xs sm:text-sm md:text-base font-semibold tracking-widest text-white">
          @Unknown number<br />
          @~Hruday Pandit
        </div>
      </div>
    </div>
  );
}

/** ✅ Tap/hover to read full desc */
function BlogCard({ b }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((p) => !p)}
      className="group relative cursor-pointer rounded-3xl border border-neutral-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      {/* hover ring */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accentSoft/40" />
      </div>
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-accentSoft/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Category pill */}
        <div className="mb-3 inline-flex text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1 bg-neutral-50">
          {b.category || "General"}
        </div>

        {/* title */}
        <div className="text-lg font-extrabold text-text-heading leading-snug">
          {b.title}
        </div>

        {/* desc */}
        <motion.p layout className="mt-3 text-sm text-text-body leading-relaxed">
          {expanded ? b.desc : `${b.desc.substring(0, 180)}...`}
        </motion.p>

        {/* keywords */}
        <motion.div
          layout
          className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
        >
          <div className="text-xs font-semibold text-text-heading">SEO keywords</div>
          <div className="mt-1 text-xs text-text-muted leading-relaxed">
            {b.keywords}
          </div>
        </motion.div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-text-muted">ARTICLE</span>
          <span className="text-xs font-semibold rounded-full border border-neutral-200 px-4 py-1 bg-white group-hover:border-brand-primary/40 transition">
            {expanded ? "Close" : "Read"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
