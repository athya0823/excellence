import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";

const blogs = [
  {
    title: "The Final Leap – Turning Tests into Success (NEET UG)",
    desc:
      "After every test, students experience a mix of anxiety, self-analysis, and speculation. The Final Leap explains how to convert test performance into meaningful improvement instead of stress. This article focuses on post-test analysis, emotional control, mistake tracking, and mindset correction, helping NEET aspirants take the final decisive step toward success.",
    keywords: "NEET test analysis, post-test strategy, NEET mindset, exam improvement",
  },
  {
    title: "NEET Preparation Strategy for Repeaters (Droppers)",
    desc:
      "Repeaters need a different approach, not the same routine repeated again. This blog outlines a time-tested NEET repeater strategy, focusing on Physics & Chemistry concept rebuilding, structured revision, time management, and avoiding past mistakes. Ideal for students aiming at rank improvement.",
    keywords: "NEET repeater strategy, dropper NEET preparation, rank improvement NEET",
  },
  {
    title: "How to Score a Perfect 360 in NEET Biology",
    desc:
      "Biology contributes the maximum weightage in NEET UG. This article explains a systematic NCERT-first approach, covering diagrams, keywords, repeated revisions, and MCQ-based learning to help students aim for 360/360 in Biology.",
    keywords: "NEET Biology preparation, score 360 Biology, NCERT Biology NEET",
  },
  {
    title: "How to Score Good Marks in NEET UG",
    desc:
      "Scoring well in NEET is about balanced preparation, not overworking one subject. This blog explains smart subject prioritisation, revision cycles, MCQ practice, and test analysis, helping students improve overall marks across Physics, Chemistry, and Biology.",
    keywords: "how to score in NEET, NEET study plan, NEET UG strategy",
  },
  {
    title: "How to Complete the NEET Syllabus on Time",
    desc:
      "Many students struggle with incomplete syllabi. This article presents a realistic, time-bound NEET syllabus completion plan, including weekly targets, revision slots, and test integration—ensuring students finish early and revise multiple times.",
    keywords: "complete NEET syllabus, NEET time management, NEET planning",
  },
  {
    title: "Tips & Techniques to Amplify Physics Scores in NEET",
    desc:
      "Physics is often the biggest challenge for NEET aspirants. This blog focuses on interlinking chapters, concept clarity, numerical practice, and formula application, helping students overcome fear and boost Physics scores.",
    keywords: "NEET Physics tips, improve Physics score NEET, NEET numericals",
  },
  {
    title: "Importance of NEET in MBBS Admission",
    desc:
      "NEET is the single gateway to MBBS in India. This article explains the role of NEET in medical admissions, eligibility, competition level, and why structured preparation is essential for securing a government medical seat.",
    keywords: "importance of NEET, NEET for MBBS, medical entrance exam India",
  },
  {
    title: "How Do NEET Toppers Study?",
    desc:
      "NEET toppers don’t study longer — they study smarter. This blog highlights toppers’ habits, including consistency, revision techniques, mock test usage, and mistake analysis that average students often ignore.",
    keywords: "NEET toppers strategy, how toppers study NEET, NEET success habits",
  },
  {
    title: "NEET Exam Pattern Explained (Latest Format)",
    desc:
      "Understanding the NEET exam pattern is critical for effective preparation. This article explains paper structure, marking scheme, subject-wise distribution, and exam mode, helping students align their preparation with actual exam requirements.",
    keywords: "NEET exam pattern, NEET marking scheme, NEET UG structure",
  },
  {
    title: "5 Mistakes You Must Avoid During NEET Preparation",
    desc:
      "Even hardworking students fail due to avoidable mistakes. This blog discusses the top 5 NEET preparation errors, including ignoring NCERT, poor revision, lack of testing, and unrealistic planning.",
    keywords: "NEET mistakes, NEET preparation errors, avoid failure in NEET",
  },
  {
    title: "NEET Tips: Study Long Hours Without Fatigue",
    desc:
      "NEET demands long study hours, but burnout reduces efficiency. This article shares scientific and practical tips to improve concentration, stamina, and productivity without mental exhaustion.",
    keywords: "study long hours NEET, NEET fatigue management, focus tips NEET",
  },
  {
    title: "A Teacher vs A Coach – What NEET Aspirants Need",
    desc:
      "There’s a big difference between teaching concepts and coaching for competition. This blog explains why NEET aspirants need mentors who focus on application, testing, and exam temperament, not just theory.",
    keywords: "teacher vs coach NEET, NEET coaching importance, exam mentorship",
  },
  {
    title: "The Day 1 to Exam Day – A NEET Aspirant’s Journey",
    desc:
      "This motivational article explains the emotional and academic journey of a NEET aspirant, highlighting discipline, consistency, setbacks, and growth from the first day of preparation until exam day.",
    keywords: "NEET preparation journey, NEET motivation, exam discipline",
  },
  {
    title: "Failing Forward – Learning from Mistakes in NEET",
    desc:
      "Mistakes are inevitable, but unanalysed mistakes are dangerous. This blog teaches students how to convert failures into improvement tools through proper error analysis and corrective planning.",
    keywords: "NEET mistake analysis, failing forward NEET, test improvement",
  },
  {
    title: "How to Mug Up NCERT Biology the Right Way",
    desc:
      "Memorising Biology without understanding leads to confusion. This article explains a step-by-step NCERT Biology study process, combining reading, repetition, diagrams, and MCQs.",
    keywords: "NCERT Biology NEET, how to memorise biology, NEET biology method",
  },
  {
    title: "Distractions During NEET Preparation & How to Avoid Them",
    desc:
      "Mobile phones, social media, and peer pressure are major distractions. This blog provides practical discipline strategies to maintain focus during long NEET preparation phases.",
    keywords: "NEET distractions, focus during NEET prep, avoid mobile addiction",
  },
  {
    title: "NEET Story – Planning Exam Day Perfectly",
    desc:
      "This article highlights the importance of exam-day planning, including travel, documents, time management, and mental calm—often ignored but crucial for performance.",
    keywords: "NEET exam day tips, NEET planning, exam hall strategy",
  },
  {
    title: "How to Study Organic Chemistry for NEET",
    desc:
      "Organic Chemistry becomes easy with the right conceptual sequence. This blog explains how to balance mechanisms, reactions, and NCERT alignment for NEET success.",
    keywords: "NEET organic chemistry, how to study organic NEET, reaction mechanisms",
  },
  {
    title: "Rules, Process & Discipline in NEET Preparation",
    desc:
      "NEET success is built on systems and discipline, not motivation alone. This blog explains how structured rules, routines, and consistency outperform random hard work.",
    keywords: "NEET discipline, study routine NEET, systematic preparation",
  },
  {
    title: "USP of APMA – What Makes Preparation Effective",
    desc:
      "This article explains the educational philosophy, structured approach, and academic systems that support serious NEET aspirants—focusing on learning quality, not tall claims.",
    keywords: "NEET coaching approach, academic system NEET, preparation methodology",
  },
  {
    title: "Busting Common Myths About NEET",
    desc:
      "NEET is surrounded by myths like “only toppers crack it” or “long hours guarantee success.” This blog debunks common misconceptions and provides realistic clarity for students and parents.",
    keywords: "NEET myths, NEET facts, truth about NEET exam",
  },
];

export default function Blogs() {
  return (
    <div>
      <section className="bg-surface-muted border-b border-neutral-200">
        <Container className="py-14">
          <Badge variant="accent">Blog</Badge>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-text-heading">
            Latest Articles
          </h1>
          <p className="mt-4 text-text-body">
            NEET-focused strategies, tips, and guidance.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-soft transition"
              >
                <div className="text-lg font-extrabold text-text-heading">{b.title}</div>
                <p className="mt-3 text-sm text-text-body leading-relaxed">{b.desc}</p>
                <div className="mt-4 text-xs text-text-muted">
                  <span className="font-semibold text-text-heading">SEO keywords:</span>{" "}
                  {b.keywords}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
