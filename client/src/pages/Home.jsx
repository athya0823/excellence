import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Accordion from "../components/ui/Accordion";
import { courses } from "../data/courses";
import { faqs } from "../data/faqs";
import hero1 from "../assets/gallery/g1.jpeg"; 

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-surface-light border-b border-neutral-200">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <Badge variant="accent">NEET Excellence Medical Academy</Badge>
              <h5 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-text-heading">
                From Aspirant to Doctor
              </h5>
              <p className="mt-4 text-text-body leading-relaxed">
                Temporary content for Phase-1 UI. We will replace it with final
                institute message, achievements, and batch info.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/admission">
                  <Button>Enquire Now</Button>
                </Link>
                <Link to="/courses">
                  <button className="rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-white">
                    View Courses
                  </button>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <Stat title="1000+" sub="Students" />
                <Stat title="Top Ranks" sub="Results" />
                <Stat title="Expert" sub="Faculty" />
              </div>
            </div>

            {/* Right visual placeholder (replace with slider/banner later) */}
            <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <img
                src={hero1}
                alt="Institute"
                className="h-72 md:h-96 w-full object-cover"
              />
              <div className="p-5">
                <div className="font-semibold">Banner / Slider Area</div>
                <div className="text-sm text-neutral-600 mt-1">
                  We will plug your final banners and images here.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* COURSES */}
      <section className="py-12">
        <Container>
          <SectionHeader
            title="Popular Courses"
            subtitle="Explore our NEET-focused programs (temporary data)."
            actionText="See all"
            actionTo="/courses"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* RESULTS / TOPPERS placeholder */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-200">
        <Container>
          <SectionHeader
            title="Results & Toppers"
            subtitle="Add year-wise toppers, ranks, and images (client content pending)."
            actionText="View Results"
            actionTo="/results"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PlaceholderCard title="Topper Card" />
            <PlaceholderCard title="Rank Highlights" />
            <PlaceholderCard title="Success Stories" />
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS placeholder */}
      <section className="py-12">
        <Container>
          <SectionHeader
            title="Testimonials"
            subtitle="We will replace with real testimonials and student photos."
            actionText="See more"
            actionTo="/testimonials"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-200">
        <Container>
          <SectionHeader
            title="FAQs"
            subtitle="Common questions (temporary)."
            actionText="Contact"
            actionTo="/contact"
          />
          <div className="mt-6 max-w-3xl">
            <Accordion items={faqs} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-2xl font-extrabold">Ready to start?</div>
              <div className="mt-2 text-neutral-600">
                Submit an enquiry and our team will guide you.
              </div>
            </div>
            <Link to="/admission">
              <Button className="px-6 py-3">Admission / Enquiry</Button>
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
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-neutral-600">{subtitle}</p>
      </div>
      {actionText ? (
        <Link to={actionTo} className="text-sm font-semibold underline">
          {actionText}
        </Link>
      ) : null}
    </div>
  );
}

function Stat({ title, sub }) {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-4">
      <div className="text-lg font-bold">{title}</div>
      <div className="text-xs text-neutral-500">{sub}</div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="rounded-2xl border border-neutral-200 bg-white hover:shadow-sm transition overflow-hidden"
    >
      <div className="h-28 bg-neutral-100" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold line-clamp-2">{course.title}</div>
          <Badge variant="outline">{course.badge}</Badge>
        </div>
        <div className="mt-2 text-sm text-neutral-600 line-clamp-3">
          {course.description}
        </div>
        <div className="mt-4 text-xs text-neutral-500">
          {course.duration} • {course.mode}
        </div>
      </div>
    </Link>
  );
}

function PlaceholderCard({ title }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">
        Placeholder section for Phase-1.
      </div>
      <div className="mt-4 h-24 rounded-xl bg-neutral-100" />
    </div>
  );
}

function TestimonialCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-neutral-100" />
        <div>
          <div className="text-sm font-semibold">Student Name</div>
          <div className="text-xs text-neutral-500">NEET Batch</div>
        </div>
      </div>
      <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
        “Placeholder testimonial text. We’ll replace with real feedback provided
        by the institute.”
      </p>
    </div>
  );
}
