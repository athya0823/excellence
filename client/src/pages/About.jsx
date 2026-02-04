import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";

export default function About() {
  return (
    <div>
      <section className="bg-surface-muted border-b border-neutral-200">
        <Container className="py-14">
          <Badge variant="accent">About NEMA</Badge>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-text-heading">
            NEET Excellence Medical Academy
          </h1>

          <p className="mt-5 text-text-body leading-relaxed">
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

          <p className="mt-4 text-text-body leading-relaxed">
            At NEET Excellence Medical Academy, we believe that quality education requires personal attention.
            That’s why we maintain small batch sizes, ensuring individual mentoring, regular performance analysis,
            and continuous academic support for every student.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <h2 className="text-2xl font-bold text-text-heading">Our program offers</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
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

          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
            <h3 className="text-xl font-bold text-text-heading">Our Key Strength</h3>
            <p className="mt-3 text-text-body leading-relaxed">
              At NEET Excellence Medical Academy, our strength lies in building a disciplined, positive,
              and result-oriented learning environment that helps students grow academically as well as mentally.
            </p>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
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
                <li key={x} className="rounded-2xl bg-surface-muted p-4 text-text-body">
                  {x}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-text-body leading-relaxed">
              Our holistic approach—combining academics, discipline, and mental wellness—ensures students are not only
              prepared for NEET exams but also confident, focused, and balanced throughout their preparation journey.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
