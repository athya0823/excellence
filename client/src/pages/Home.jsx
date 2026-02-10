import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import hero1 from "../assets/gallery/g1.jpeg";

export default function Home() {
  return (
    <div>
      {/* HERO */}
<section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/60" />

  <Container className="relative py-14 md:py-20">
    <div className="grid gap-10 md:grid-cols-2 items-center text-white">
      {/* LEFT CONTENT */}
      <div>
        <Badge variant="accent">NEET Excellence Medical Academy (NEMA)</Badge>

        <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
          Welcome to the Best NEET Coaching Institute in Pune
        </h1>

        <h2 className="mt-3 text-lg md:text-2xl font-bold text-neutral-200">
          Where Strong Concepts Turn Aspirants into Medical Rankers
        </h2>

        <p className="mt-4 text-neutral-200 leading-relaxed">
          At NEET Excellence Medical Academy (NEMA), we don’t believe in shortcuts or
          rote learning. With 15+ years of experience in NEET (UG) coaching, we provide
          concept-driven teaching, error-free study material, and personalised mentoring
          that helps students crack NEET with confidence.
        </p>

        <p className="mt-4 text-neutral-200 leading-relaxed">
          If your goal is AIIMS, Government Medical Colleges, or top ranks in NEET,
          your journey starts here.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/admission">
            <Button className="bg-brand-primary hover:opacity-90">Enquire Now</Button>
          </Link>

          <Link to="/courses">
            <button className="rounded-xl px-4 py-2 text-sm font-semibold border-2 border-white text-white hover:bg-white/10">
              View Courses
            </button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <Stat title="15+ Years" sub="Experience" />
          <Stat title="Small Batches" sub="40–50 Students" />
          <Stat title="NCERT Focus" sub="NEET Pattern" />
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="rounded-3xl border border-white/20 bg-white shadow-soft overflow-hidden text-black">
        <img
          src={hero1}
          alt="NEET Excellence Medical Academy"
          className="h-72 md:h-96 w-full object-cover"
        />
        <div className="p-5">
          <div className="font-semibold">NEET Excellence Medical Academy</div>
          <div className="text-sm text-neutral-500 mt-1">(Results – 2025)</div>
        </div>
      </div>
    </div>
  </Container>
</section>

      {/* ABOUT SNAPSHOT */}
      <section className="py-12">
        <Container>
          <SectionHeader
            title="About NEET Excellence Medical Academy"
            subtitle="A specialised training institute for NEET (UG), led by highly experienced faculties."
            actionText="Read More"
            actionTo="/about"
          />

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
            <p className="text-text-body leading-relaxed">
              NEET Excellence Medical Academy is a specialised training institute for NEET (UG),
              led by a team of highly experienced faculties with over 15 years of proven expertise
              in guiding medical aspirants.
            </p>

            <p className="mt-4 text-text-body leading-relaxed">
              We focus on strong concept building, exam-oriented teaching, and result-driven preparation.
              Over the years, we have successfully mentored numerous students who have achieved their goals
              of securing admission into prestigious medical institutions such as All India Institute of Medical Sciences,
              Jawaharlal Institute of Postgraduate Medical Education and Research, Byramjee Jeejeebhoy Medical College,
              and other top Government Medical Colleges across India.
            </p>
          </div>
        </Container>
      </section>

      {/* OUR PROGRAM OFFERS */}
      <section className="py-12 bg-surface-muted border-y border-neutral-200">
        <Container>
          <SectionHeader
            title="Our program offers"
            subtitle="What students receive during their preparation journey."
          />
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Systematic and complete syllabus coverage",
              "Teaching strictly as per the latest NEET pattern and NTA guidelines",
              "Strong emphasis on numerical problem-solving and conceptual clarity",
              "Regular tests, analysis, and doubt-solving sessions",
            ].map((x) => (
              <li key={x} className="rounded-2xl border border-neutral-200 bg-white p-4 text-text-body">
                {x}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* KEY STRENGTH */}
      <section className="py-12">
        <Container>
          <SectionHeader
            title="Our Key Strength"
            subtitle="A disciplined, positive, and result-oriented learning environment."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Well-researched, error-free study material designed strictly in line with the latest NEET (UG) pattern and syllabus",
              "Systematic teaching methodology with concept clarity and exam-oriented approach",
              "Periodic doubt counters and dedicated revision sessions to reinforce learning",
              "Small batch size (40–50 students) ensuring personal attention and continuous monitoring",
              "Unique test series with regular performance analysis to track real progress",
              "On-time syllabus completion, leaving ample time for revision and practice",
              "Special training in Class 11 Mathematics, helping students strengthen Physics concepts and numerical problem-solving",
              "Regular parent–teacher interaction sessions, guiding parents on academic support and student care at home",
              "Meditation, motivation, and yoga sessions to enhance focus, reduce stress, and boost overall brain performance and well-being",
            ].map((x) => (
              <div key={x} className="rounded-2xl border border-neutral-200 bg-white p-5 hover:shadow-soft transition">
                <div className="text-sm text-text-body leading-relaxed">{x}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-brand-accentSoft p-6">
            <p className="text-text-body leading-relaxed">
              Our holistic approach—combining academics, discipline, and mental wellness—ensures students are not only
              prepared for NEET exams but also confident, focused, and balanced throughout their preparation journey.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 bg-surface-muted border-y border-neutral-200">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-2xl font-extrabold text-text-heading">Ready to start?</div>
              <div className="mt-2 text-text-body">
                Submit an enquiry and our team will guide you.
              </div>
            </div>
            <Link to="/admission">
              <Button className="bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white">Admission / Enquiry</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, actionText, actionTo }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-text-heading">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-text-muted">{subtitle}</p> : null}
      </div>
      {actionText ? (
        <Link to={actionTo} className="text-sm font-semibold underline text-brand-primary">
          {actionText}
        </Link>
      ) : null}
    </div>
  );
}

function Stat({ title, sub }) {
  return (
    <div className="rounded-xl bg-white border border-neutral-200 p-2">
      <div className="text-lg font-semibold text-text-heading">{title}</div>
      <div className="text-xs text-text-muted">{sub}</div>
    </div>
  );
}
