import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { faculty } from "../data/faculty";
import { Link } from "react-router-dom";

export default function Faculty() {
  const [dept, setDept] = useState("All");

  const depts = useMemo(() => {
    const set = new Set(faculty.map((f) => f.department));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (dept === "All") return faculty;

    return faculty.filter(
      (f) =>
        f.department?.trim().toLowerCase() ===
        dept.trim().toLowerCase()
    );
  }, [dept]);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10">
          <Container className="py-14 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Badge variant="accent">Our Faculties</Badge>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-4 text-2xl md:text-3xl font-bold tracking-tight"
                >
                  Learn from Experienced Mentors
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-white/90"
                >
                  Subject-wise expert faculty focused on concept clarity,
                  NCERT alignment, and exam-oriented preparation.
                </motion.p>
              </div>

              <div className="flex gap-3">
                <Link to="/admission">
                  <Button className="bg-brand-primary hover:bg-white hover:text-black">
                    Enquire Now
                  </Button>
                </Link>
                <Link
                  to="/contact"
                  className="rounded-xl px-4 py-2 text-sm hover:text-black font-semibold border border-neutral-300 hover:bg-white"
                >
                  Contact
                </Link>

              </div>
            </div>

            {/* FILTER BUTTONS */}
            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-semibold border transition
                    ${
                      dept === d
                        ? "bg-white text-black border-white"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                    }`}
                >
                  {d}
                </button>
              ))}
            </motion.div>
          </Container>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="py-12">
        <Container>
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="wait">
              {filtered.map((f) => (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <FacultyCard f={f} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-6 text-center text-neutral-600">
              No faculty found.
            </div>
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
function FacultyCard({ f }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="h-60 bg-neutral-100 overflow-hidden">
        {f.photo ? (
          <motion.img
            src={f.photo}
            alt={f.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-neutral-500">
            Faculty Photo
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{f.name}</h3>
          <span className="text-xs font-semibold rounded-full border px-3 py-1">
            {f.department}
          </span>
        </div>

        <p className="mt-2 text-sm text-neutral-600">
          <span className="font-semibold">Experience:</span> {f.exp}
        </p>

        <p className="text-sm text-neutral-600">
          <span className="font-semibold">Qualification:</span>{" "}
          {f.qualification}
        </p>

        <p className="mt-4 text-sm text-neutral-600">{f.short}</p>
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-semibold underline">
            Read full profile
          </summary>
          <div className="text-sm font-bold">Key Focus</div>
          <ul className="mt-2 grid gap-2">
            {(f.bullets || []).map((b) => (
              <li
                key={b}
                className="text-sm rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2"
              >
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-2 text-sm text-neutral-700 leading-relaxed">
            {(f.bio || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      </div>
    </motion.div>
  );
}
