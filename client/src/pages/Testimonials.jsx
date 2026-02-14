import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { testimonials } from "../data/testimonials";

const easeOut = [0.16, 1, 0.3, 1];

export default function Testimonials() {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const viewport = { once: true, amount: 0.2 };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative py-10 sm:py-14 md:py-16 text-white">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Badge variant="accent">Testimonials</Badge>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Student Success Stories
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                Real journeys. Real results. We’ll replace these with final testimony text as soon as
                it is shared.
              </p>
            </motion.div>

            {/* quick stats strip (optional but nice UI) */}
            <motion.div variants={fadeUp} className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              <MiniStat title="Mentorship" sub="Personal guidance" />
              <MiniStat title="Consistency" sub="Tests + analysis" />
              <MiniStat title="NCERT Focus" sub="NEET aligned" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-10 sm:py-12">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={fadeUp} layout>
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease: easeOut }}
            className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-text-heading">
                Ready to join NEMA?
              </div>
              <div className="mt-2 text-sm sm:text-base text-text-body">
                Submit an enquiry and our team will guide you.
              </div>
            </div>

            <Link to="/admission" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white transition">
                Admission / Enquiry
              </Button>
            </Link>
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

function MiniStat({ title, sub }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-white/80">{sub}</div>
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="group relative rounded-3xl border border-neutral-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      {/* gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-primary/25 via-transparent to-brand-accentSoft/40" />
      </div>

      {/* soft highlight */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-accentSoft/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* header */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center ring-1 ring-neutral-200 group-hover:ring-brand-primary/40 transition">
            {t.photo ? (
              <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs text-neutral-500">Photo</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="font-extrabold text-text-heading truncate">{t.name}</div>
            <div className="text-sm text-text-muted truncate">{t.subtitle}</div>
          </div>
        </div>

        {/* quote */}
        <div className="mt-5 relative">
          {/* quote mark bubble */}
          <div className="absolute -top-3 -left-1 h-8 w-8 rounded-2xl bg-brand-accentSoft/60 flex items-center justify-center text-text-heading text-lg font-black">
            “
          </div>

          <div className="text-sm sm:text-[15px] text-text-body leading-relaxed pt-3">
            {t.quote}
          </div>
        </div>

        {/* footer */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-text-muted">TESTIMONY</span>
          <span className="text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1 bg-white group-hover:border-brand-primary/40 transition">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
