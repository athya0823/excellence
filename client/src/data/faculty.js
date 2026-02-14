import nishantPhoto from "../assets/faculty/nishant-physics.jpeg";
import sarveshPhoto from "../assets/faculty/sarvesh-chemistry.jpeg";
import bhaveshPhoto from "../assets/faculty/bhavesh-biology.jpeg";
import madhumatiPhoto from "../assets/faculty/madhumati-biology.jpeg";
// import raviPhoto from "../assets/faculty/ravi-maths.jpg";


export const faculty = [
  {
    id: "sarvesh-chem",
    department: "Chemistry",
    name: "Sarvesh Peepre Sir",
    exp: "15+ years",
    qualification: "NEET Chemistry Mentor",
    photo: sarveshPhoto,
    short:
      "Teaches Chemistry logically and concept-driven so students connect chapters instead of memorizing facts.",
    bullets: [
      "Organic: reaction mechanisms + logical flow",
      "Physical: numerical problem solving with strong concepts",
      "Inorganic: reasoning, trends + smart memorization",
      "Calm guidance + individual attention",
    ],
    bio: [
      "Chemistry often feels confusing due to disconnected facts and excessive memorisation.",
      "Sarvesh Sir teaches Chemistry in a logical, structured, and concept-driven manner, making it predictable and manageable.",
      "He connects reactions, theories, and numericals with clear reasoning and practical understanding.",
    ],
  },
  {
    id: "nishant-physics",
    department: "Physics",
    name: "Nishant Singh Sir",
    exp: "15+ years",
    qualification: "B.Tech (Mechanical) RTU Kota, Academic exposure at IIT Bombay",
    photo: nishantPhoto, // add image path later
    short:
      "Transforms Physics from fear to confidence using real-life analogies and concept clarity.",
    bullets: [
      "Daily-life applications + practical demonstrations",
      "Concept clarity over formula memorization",
      "NEET / AIPMT / AIIMS / IISER mentoring experience",
      "Structured, student-centric teaching approach",
    ],
    bio: [
      "Physics is often considered the most challenging subject by students preparing for competitive exams, and addressing this fear requires both clarity and care.",
      "Nishant Sir focuses on conceptual clarity and teaches Physics through real-world analogies and classroom-based practical demonstrations.",
      "His methodology ensures students understand principles for long-term retention and problem-solving ability.",
    ],
  },
  {
    id: "bhavesh-bio",
    department: "Biology",
    name: "Dr. Bhavesh Sir",
    exp: "12 years",
    qualification: "MBBS, MD",
    photo: bhaveshPhoto,
    short:
      "NCERT line-by-line clarity with medical relevance — helps students convert Biology into a scoring strength.",
    bullets: [
      "NCERT line-by-line clarity",
      "NEET question-pattern aligned teaching",
      "Smart revision techniques for retention",
      "Clinical examples for deeper understanding",
    ],
    bio: [
      "Biology is the highest-scoring subject in NEET when taught with medical insight and exam-oriented precision.",
      "Dr. Bhavesh teaches Biology from a doctor’s perspective, helping students develop logical understanding in Human Physiology, Botany, and Zoology.",
      "His mentorship focuses on confidence, precision, and speed—key for high NEET Biology scores.",
    ],
  },
  {
    id: "madhumati-bio",
    department: "Biology",
    name: "Dr. Madhumati ",
    exp: "17 years",
    qualification: "NEET Biology Faculty",
    photo: madhumatiPhoto,
    short:
      "Calm, systematic NCERT-centric teaching that makes Biology structured, clear, and scoring.",
    bullets: [
      "NCERT-centric: every line, diagram, keyword",
      "Step-by-step Human Physiology explanation",
      "Botany & Zoology interlinking",
      "PYQ-based discussion + repeated revision",
    ],
    bio: [
      "Dr. Madhumati focuses on making Biology clear, structured, and scoring for NEET aspirants.",
      "Her approach is calm, systematic, and highly student-oriented, helping learners retain concepts without confusion.",
      "She emphasizes frequently asked NEET areas, common mistakes, and smart answering techniques.",
    ],
  },
  {
    id: "ravi-maths",
    department: "Mathematics",
    name: "Ravi Jain Sir",
    exp: "12 years",
    qualification: "NIT Durgapur Graduate",
    photo: "",
    short:
      "Builds strong problem-solving skills with step-by-step, structured and student-friendly teaching.",
    bullets: [
      "Concept clarity + logical thinking",
      "Step-by-step approach for accuracy & speed",
      "Structured practice methodology",
    ],
    bio: [
      "Ravi Jain brings 12 years of teaching experience in Mathematics, helping students build strong problem-solving skills and exam confidence.",
      "He focuses on concept clarity, logical thinking, and a step-by-step approach, enabling students to handle Maths with accuracy and speed.",
    ],
  },
];
