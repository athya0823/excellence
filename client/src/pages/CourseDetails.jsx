import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { courses } from "../data/courses";

export default function CourseDetails() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <Container className="py-12">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <p className="mt-2 text-neutral-600">Please check the course link.</p>
        <Link className="inline-block mt-4 underline font-semibold" to="/courses">
          Back to Courses
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Badge variant="accent">{course.badge}</Badge>
            <div className="text-xs text-neutral-500">
              {course.duration} • {course.mode}
            </div>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold">{course.title}</h1>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            {course.description}
          </p>

          <h2 className="mt-8 text-xl font-bold">Highlights</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {course.highlights.map((h) => (
              <li
                key={h}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="w-full lg:w-[360px]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <div className="font-bold text-lg">Get Admission Info</div>
            <div className="mt-2 text-sm text-neutral-600">
              Submit an enquiry and our team will contact you.
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/admission" className="flex-1">
                <Button className="w-full">Enquire</Button>
              </Link>
              <Link to="/courses" className="flex-1">
                <button className="w-full rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-neutral-50">
                  Back
                </button>
              </Link>
            </div>

            <div className="mt-6 text-xs text-neutral-500">
              Note: Fees, schedule, and syllabus will be updated once the final content is shared.
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
