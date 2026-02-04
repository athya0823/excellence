import { useMemo, useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import TopperCard from "../components/results/TopperCard";
import { resultsByYear } from "../data/results";
import { Link } from "react-router-dom";
import results2025Banner from "../assets/results/thumbnail.png";


export default function Results() {
  const years = useMemo(() => resultsByYear.map((x) => x.year), []);
  const [activeYear, setActiveYear] = useState(years[0]);

  const active = resultsByYear.find((x) => x.year === activeYear) || resultsByYear[0];

  return (
    <div>
      {/* Hero */}
      <section className="bg-surface-muted border-b border-neutral-200">
        <Container className="py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="accent">Results & Toppers</Badge>
              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
                Our Mentored Students
              </h1>
              {/* <p className="mt-3 text-neutral-600 max-w-2xl leading-relaxed">
                Temporary results UI for Phase-1. We will replace names, ranks, scores, and photos
                with the institute’s official data.
              </p> */}
            </div>

            <div className="flex gap-3">
              <Link to="/admission">
                <Button>Enquire Now</Button>
              </Link>
              <a
                href="#yearwise"
                className="rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-white"
              >
                View Year-wise
              </a>
            </div>
          </div>

          {/* Quick Highlights */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Highlight title="Top Ranks" value="AIR 100–1500" note="(Demo)" />
            <Highlight title="High Scores" value="630–690" note="(Demo)" />
            <Highlight title="Selections" value="100+" note="(Demo)" />
          </div>
        </Container>
      </section>

      {/* Year tabs + Section */}
      <section id="yearwise" className="py-12">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Year-wise Results</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Select a year to view toppers list (temporary data).
              </p>
            </div>

            {/* Year Tabs */}
            <div className="flex flex-wrap gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setActiveYear(y)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold border transition
                    ${
                      activeYear === y
                        ? "bg-black text-white border-black"
                        : "bg-white border-neutral-300 hover:bg-neutral-50"
                    }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Year Banner */}
          <div className="mt-7 rounded-3xl border border-neutral-200 bg-white overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-neutral-600">
                  NEET Results {active.year}
                </div>
                <div className="mt-1 text-2xl font-extrabold">{active.headline}</div>
                <div className="mt-2 text-sm text-neutral-600 max-w-2xl">
                  {active.summary}
                </div>
              </div>

              <div className="flex gap-3">
                <Link to="/contact" className="rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-neutral-50">
                  Contact
                </Link>
                <Link to="/admission">
                  <Button>Admission</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Topper Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {active.toppers.map((t) => (
              <TopperCard key={`${active.year}-${t.name}-${t.rank}`} topper={t} />
            ))}
          </div>

          {/* 2025 Result Banner BELOW cards */}
          {Number(active.year) === 2025 && (
            <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-4 md:p-6 shadow-soft">
              <img
                src={results2025Banner}
                alt="NEET 2025 Results - NEET Excellence Medical Academy"
                className="w-full rounded-2xl object-contain"
              />
            </div>
          )}

          {/* Note */}
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
            <span className="font-semibold">Note:</span> This is temporary data for UI approval.
            Once you provide the final results list + photos, we will update it.
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 bg-neutral-50 border-t border-neutral-200">
        <Container>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-2xl font-extrabold">Want to be a Topper?</div>
              <div className="mt-2 text-neutral-600">
                Join our NEET programs and get structured guidance + testing.
              </div>
            </div>
            <Link to="/admission">
              <Button className="px-6 py-3">Enquire Now</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Highlight({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="text-sm font-semibold text-neutral-600">{title}</div>
      <div className="mt-2 text-2xl font-extrabold">
        {value} <span className="text-sm font-semibold text-neutral-500">{note}</span>
      </div>
      <div className="mt-2 text-xs text-neutral-500">
        Replace with official institute data later.
      </div>
    </div>
  );
}
