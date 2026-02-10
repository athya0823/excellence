import { useMemo, useState } from "react";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { galleryItems } from "../data/gallery";
import { Link } from "react-router-dom";

export default function Gallery() {
  const tags = useMemo(() => {
    const set = new Set(galleryItems.map((x) => x.tag));
    return ["All", ...Array.from(set)];
  }, []);

  const [activeTag, setActiveTag] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (activeTag === "All") return galleryItems;
    return galleryItems.filter((x) => x.tag === activeTag);
  }, [activeTag]);

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
              <Badge variant="accent">Gallery</Badge>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                Campus & Classroom Moments
              </h1>
              <p className="mt-5 text-white/90 leading-relaxed">
                A glimpse of our classrooms, infrastructure, and learning environment.
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

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border transition
                  ${
                    activeTag === t
                      ? "bg-brand-primary text-white hover:text-black hover:bg-white border-black"
                      : "bg-brand-primary text-white hover:text-black  hover:bg-white"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Container>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item)}
                className="group rounded-3xl border border-neutral-200 bg-white overflow-hidden text-left hover:shadow-sm transition"
              >
                <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{item.title}</div>
                    <span className="text-xs font-semibold rounded-full border border-neutral-200 px-3 py-1">
                      {item.tag}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-neutral-600">
                    Click to preview
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* LIGHTBOX MODAL */}
      {active ? (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-semibold">{active.title}</div>
              <button
                onClick={() => setActive(null)}
                className="text-white/90 hover:text-white text-sm font-semibold"
              >
                Close ✕
              </button>
            </div>

            <div className="rounded-3xl overflow-hidden bg-black">
              <img
                src={active.src}
                alt={active.title}
                className="w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
