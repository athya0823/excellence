import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";

const easeOut = [0.16, 1, 0.3, 1];

export default function About() {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const viewport = { once: true, amount: 0.2 };

  const offers = [
    "Systematic and complete syllabus coverage",
    "Teaching strictly as per the latest NEET pattern and NTA guidelines",
    "Strong emphasis on numerical problem-solving and conceptual clarity",
    "Regular tests, analysis, and doubt-solving sessions",
  ];

  const strengths = [
    "Well-researched, error-free study material designed strictly in line with the latest NEET (UG) pattern and syllabus",
    "Systematic teaching methodology with concept clarity and exam-oriented approach",
    "Periodic doubt counters and dedicated revision sessions to reinforce learning",
    "Small batch size (40–50 students) ensuring personal attention and continuous monitoring",
    "Unique test series with regular performance analysis to track real progress",
    "On-time syllabus completion, leaving ample time for revision and practice",
    "Special training in Class 11 Mathematics, helping students strengthen Physics concepts and numerical problem-solving",
    "Regular parent–teacher interaction sessions, guiding parents on academic support and student care at home",
    "Meditation, motivation, and yoga sessions to enhance focus, reduce stress, and boost overall brain performance and well-being",
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative py-10 sm:py-14 md:py-20 text-white">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Badge variant="accent">About NEMA</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
            >
              NEET Excellence Medical Academy
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-neutral-200 leading-relaxed max-w-3xl"
            >
              NEET Excellence Medical Academy is a specialised training institute for NEET (UG),
              led by a team of highly experienced faculties with over 15 years of proven expertise
              in guiding medical aspirants.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-neutral-200 leading-relaxed max-w-3xl"
            >
              We focus on strong concept building, exam-oriented teaching, and result-driven preparation.
              Over the years, we have successfully mentored numerous students who have achieved their goals
              of securing admission into prestigious medical institutions such as All India Institute of Medical Sciences,
              Jawaharlal Institute of Postgraduate Medical Education and Research, Byramjee Jeejeebhoy Medical College,
              and other top Government Medical Colleges across India.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-neutral-200 leading-relaxed max-w-3xl"
            >
              At NEET Excellence Medical Academy, we believe that quality education requires personal attention.
              That’s why we maintain small batch sizes, ensuring individual mentoring, regular performance analysis,
              and continuous academic support for every student.
            </motion.p>

            {/* quick highlights */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
            >
              <Highlight title="15+ Years" sub="NEET Coaching" />
              <Highlight title="40–50" sub="Small Batches" />
              <Highlight title="Result Driven" sub="Mentoring" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="py-10 sm:py-12">
        <Container>
          {/* PROGRAM OFFERS */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-xl sm:text-2xl font-bold text-text-heading"
            >
              Our Program Offers
            </motion.h2>

            <motion.ul
              variants={stagger}
              className="mt-5 grid gap-3 md:grid-cols-2"
            >
              {offers.map((x) => (
                <motion.li
                  key={x}
                  variants={fadeUp}
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 text-text-body hover:shadow-soft transition"
                >
                  {x}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* KEY STRENGTH */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            className="mt-10 rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-text-heading">Our Key Strength</h3>
                <p className="mt-3 text-text-body leading-relaxed max-w-3xl">
                  At NEET Excellence Medical Academy, our strength lies in building a disciplined, positive,
                  and result-oriented learning environment that helps students grow academically as well as mentally.
                </p>
              </div>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={stagger}
              className="mt-5 grid gap-3 md:grid-cols-2"
            >
              {strengths.map((x) => (
                <motion.li
                  key={x}
                  variants={fadeUp}
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="rounded-2xl bg-surface-muted p-4 text-text-body hover:shadow-soft transition"
                >
                  {x}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              className="mt-6 text-text-body leading-relaxed"
            >
              Our holistic approach—combining academics, discipline, and mental wellness—ensures students are not only
              prepared for NEET exams but also confident, focused, and balanced throughout their preparation journey.
            </motion.p>
          </motion.div>
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

function Highlight({ title, sub }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/20 p-3">
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="text-xs text-neutral-200">{sub}</div>
    </div>
  );
}
