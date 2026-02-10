import { useMemo, useState } from "react";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { faculty } from "../data/faculty";
import { Link } from "react-router-dom";



export default function Faculty() {
  const depts = useMemo(() => {
    const set = new Set(faculty.map((f) => f.department));
    return ["All", ...Array.from(set)];
  }, []);

  const [dept, setDept] = useState("All");

  const filtered = useMemo(() => {
    return dept === "All" ? faculty : faculty.filter((f) => f.department === dept);
  }, [dept]);

  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-neutral-200"
  style={{
    backgroundImage: "url('/src/assets/gallery/classroom-2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
    <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10">
        <Container className="py-14 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="accent">Our Faculties</Badge>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                Learn from Experienced Mentors
              </h1>
              <p className="mt-4 text-white/90">
                Subject-wise expert faculty focused on concept clarity, NCERT alignment,
                and exam-oriented preparation.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/admission">
                <Button className="bg-brand-primary hover:text-black hover:bg-white">Enquire Now</Button>
              </Link>
              <Link
                to="/contact"
                className="rounded-xl px-4 py-2 text-sm hover:text-black font-semibold border border-neutral-300 hover:bg-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* FILTER TABS */}
          <div className="mt-8 flex flex-wrap gap-2">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`rounded-xl px-4 py-2 text-sm font-semi border transition
                  ${
                    dept === d
                      ? "bg-white text-black border-black"
                      : "bg-brand-primary hover:text-black text-white border-neutral-300 hover:bg-neutral-50"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </Container>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f) => (
              <FacultyCard key={f.id} f={f} />
            ))}
          </div>

          {/* NOTE */}
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
            <span className="font-semibold">Note:</span> Faculty photos can be added anytime.
            Right now UI uses placeholders to match layout.
          </div>
        </Container>
      </section>
    </div>
  );
}

function FacultyCard({ f }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden hover:shadow-sm transition">
      {/* photo */}
      <div className="h-60 bg-neutral-100 flex items-center justify-center">
        {f.photo ? (
  <img src={f.photo} alt={f.name} className="h-full w-full object-cover" />
) : (
  <div className="text-sm text-neutral-500">Faculty Photo</div>
)}

      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="font-extrabold text-lg">{f.name}</div>
          <span className="text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1">
            {f.department}
          </span>
        </div>

        <div className="mt-2 text-sm text-neutral-600">
          <span className="font-semibold">Experience:</span> {f.exp}
        </div>

        <div className="mt-1 text-sm text-neutral-600">
          <span className="font-semibold">Qualification:</span> {f.qualification}
        </div>

        <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
          {f.short}
        </p>

        <div className="mt-5">
          <div className="text-sm font-bold">Key Focus</div>
          <ul className="mt-2 grid gap-2">
            {f.bullets.map((b) => (
              <li
                key={b}
                className="text-sm rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-semibold underline">
            Read full profile
          </summary>
          <div className="mt-3 space-y-2 text-sm text-neutral-700 leading-relaxed">
            {f.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
