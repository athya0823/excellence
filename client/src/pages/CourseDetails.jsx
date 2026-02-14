import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { courses } from "../data/courses";

const easeOut = [0.16, 1, 0.3, 1];

export default function CourseDetails() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const viewport = { once: true, amount: 0.2 };

  if (!course) {
    return (
      <div className="bg-white">
        <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
          <div className="absolute inset-0 bg-black/60" />
          <Container className="relative py-10 sm:py-14 md:py-16 text-white">
            <Badge variant="accent">Courses</Badge>
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Course not found
            </h1>
            <p className="mt-3 text-neutral-200 max-w-2xl">
              Please check the course link or go back to the courses page.
            </p>
            <div className="mt-6">
              <Link to="/courses" className="inline-flex">
                <button className="rounded-xl px-4 py-2 text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition">
                  Back to Courses
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* HERO STRIP */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative py-10 sm:py-14 md:py-16 text-white">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{course.badge}</Badge>
              <div className="text-xs text-neutral-200/90">
                {course.duration} • {course.mode}
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
            >
              {course.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-3 text-neutral-200 leading-relaxed max-w-3xl">
              {course.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/admission" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-brand-primary hover:opacity-90">
                  Enquire Now
                </Button>
              </Link>
              <Link to="/courses" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-xl px-4 py-2 text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition">
                  Back to Courses
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="py-10 sm:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
            {/* LEFT */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {/* Highlights */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-text-heading">Highlights</h2>

                <motion.ul
                  variants={stagger}
                  className="mt-4 grid gap-3 sm:grid-cols-2"
                >
                  {(course.highlights || []).map((h) => (
                    <motion.li
                      key={h}
                      variants={fadeUp}
                      whileHover={reduce ? undefined : { y: -3 }}
                      transition={{ duration: 0.25, ease: easeOut }}
                      className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-text-body hover:shadow-soft transition"
                    >
                      {h}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Optional sections (safe if data exists) */}
              {(course.whoFor?.length || course.syllabus?.length) ? (
                <motion.div variants={fadeUp} className="mt-6 grid gap-4 md:grid-cols-2">
                  {course.whoFor?.length ? (
                    <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-text-heading">
                        Who this is for
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-text-body">
                        {course.whoFor.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {course.syllabus?.length ? (
                    <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-text-heading">
                        Syllabus snapshot
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-text-body">
                        {course.syllabus.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </motion.div>
              ) : null}
            </motion.div>

            {/* RIGHT */}
            <motion.aside
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.65, ease: easeOut }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="font-bold text-lg text-text-heading">Get Admission Info</div>
                <div className="mt-2 text-sm text-text-body">
                  Submit an enquiry and our team will contact you.
                </div>

                <div className="mt-5 rounded-2xl bg-surface-muted p-4">
                  <div className="text-xs text-text-muted">Course</div>
                  <div className="mt-1 text-sm font-semibold text-text-heading">{course.title}</div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-muted">
                    <span className="rounded-full border border-neutral-200 bg-white px-2 py-1">
                      {course.duration}
                    </span>
                    <span className="rounded-full border border-neutral-200 bg-white px-2 py-1">
                      {course.mode}
                    </span>
                    <span className="rounded-full border border-neutral-200 bg-white px-2 py-1">
                      {course.badge}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link to="/admission" className="w-full sm:flex-1">
                    <Button className="w-full bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white transition">
                      Enquire
                    </Button>
                  </Link>

                  <Link to="/courses" className="w-full sm:flex-1">
                    <button className="w-full rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-neutral-50 transition">
                      Back
                    </button>
                  </Link>
                </div>

                <div className="mt-6 text-xs text-neutral-500">
                  Note: Fees, schedule, and syllabus will be updated once the final content is shared.
                </div>
              </div>
            </motion.aside>
          </div>
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
