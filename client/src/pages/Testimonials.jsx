import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { testimonials } from "../data/testimonials";
import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <div>
      {/* HERO */}
      {/* <section className="bg-neutral-50 border-b border-neutral-200">
        <Container className="py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="accent">Testimonials</Badge>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-text-heading">
                Student Success Stories
              </h1>
              <p className="mt-3 text-neutral-600 max-w-2xl leading-relaxed">
                UI is ready. We’ll replace these with the final “Testimony” text once client shares it.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/admission">
                <Button>Enquire Now</Button>
              </Link>
              <Link
                to="/results"
                className="rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-white"
              >
                View Results
              </Link>
            </div>
          </div>
        </Container>
      </section> */}
<section
  className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
    <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10">
    <Container className="py-12 md:py-16 text-white">
      <Badge variant="accent">Testimonials</Badge>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
        Student Success Stories
      </h1>

      <p className="mt-3 text-white/90 max-w-2xl leading-relaxed">
        UI is ready. We’ll replace these with the final testimony text.
      </p>
    </Container>
  </div>
</section>

      {/* GRID */}
      <section className="py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-2xl font-extrabold">Ready to join NEMA?</div>
              <div className="mt-2 text-neutral-600">
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

function TestimonialCard({ t }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-sm transition">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center">
          {t.photo ? (
            <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-neutral-500">Photo</span>
          )}
        </div>

        <div>
          <div className="font-extrabold">{t.name}</div>
          <div className="text-sm text-neutral-600">{t.subtitle}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-neutral-700 leading-relaxed">
        “{t.quote}”
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-neutral-500">TESTIMONY</span>
        <span className="text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1">
          Verified.
        </span>
      </div>
    </div>
  );
}
