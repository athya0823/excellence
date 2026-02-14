// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import Container from "../components/ui/Container";
// import Badge from "../components/ui/Badge";
// import Button from "../components/ui/Button";
// import { faculty } from "../data/faculty";

// const easeOut = [0.16, 1, 0.3, 1];

// function normalize(str) {
//   return String(str || "")
//     .toLowerCase()
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function getExpYears(expText) {
//   // supports: "15+ years", "10 Years", "8 yrs", "3.5 years"
//   const m = String(expText || "").toLowerCase().match(/(\d+(\.\d+)?)/);
//   return m ? Number(m[1]) : 0;
// }

// export default function Faculty() {
//   const reduce = useReducedMotion();

//   // --- Filters ---
//   const [q, setQ] = useState("");
//   const [dept, setDept] = useState("All");
//   const [qual, setQual] = useState("All");
//   const [minExp, setMinExp] = useState(0);
//   const [sortBy, setSortBy] = useState("name-asc"); // name-asc | exp-desc | dept-asc

//   // optional: pagination (prevents huge lists)
//   const [visibleCount, setVisibleCount] = useState(9);

//   // recompute options safely (no empty deps)
//   const deptOptions = useMemo(() => {
//     const set = new Set((faculty || []).map((f) => f.department).filter(Boolean));
//     return ["All", ...Array.from(set)];
//   }, []);

//   const qualOptions = useMemo(() => {
//     const set = new Set((faculty || []).map((f) => f.qualification).filter(Boolean));
//     return ["All", ...Array.from(set)];
//   }, []);

//   const maxExp = useMemo(() => {
//     return Math.max(0, ...(faculty || []).map((f) => getExpYears(f.exp)));
//   }, []);

//   // reset visible on any filter change (avoids "nothing shows" feeling)
//   useEffect(() => {
//     setVisibleCount(9);
//   }, [q, dept, qual, minExp, sortBy]);

//   // --- Animations ---
//   const fadeUp = {
//     hidden: { opacity: 0, y: reduce ? 0 : 14 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
//     exit: { opacity: 0, y: reduce ? 0 : 10, transition: { duration: 0.18 } },
//   };

//   const viewport = { once: true, amount: 0.2 };

//   // --- Filtered List (ALWAYS from original faculty) ---
//   const filtered = useMemo(() => {
//     const query = normalize(q);

//     let list = (faculty || []).filter((f) => {
//       const matchesDept = dept === "All" ? true : f.department === dept;
//       const matchesQual = qual === "All" ? true : f.qualification === qual;
//       const matchesExp = getExpYears(f.exp) >= Number(minExp || 0);

//       const hay = [
//         f.name,
//         f.department,
//         f.qualification,
//         f.exp,
//         f.short,
//         ...(f.bullets || []),
//         ...(f.bio || []),
//       ].join(" | ");

//       const matchesQuery = !query ? true : normalize(hay).includes(query);

//       return matchesDept && matchesQual && matchesExp && matchesQuery;
//     });

//     // sort (stable)
//     list = list.slice().sort((a, b) => {
//       if (sortBy === "name-asc") return String(a.name).localeCompare(String(b.name));
//       if (sortBy === "dept-asc") return String(a.department).localeCompare(String(b.department));
//       if (sortBy === "exp-desc") return getExpYears(b.exp) - getExpYears(a.exp);
//       return 0;
//     });

//     return list;
//   }, [q, dept, qual, minExp, sortBy]);

//   const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

//   function clearFilters() {
//     setQ("");
//     setDept("All");
//     setQual("All");
//     setMinExp(0);
//     setSortBy("name-asc");
//   }

//   return (
//     <div className="bg-white">
//       {/* HERO */}
//       <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
//         <div className="absolute inset-0 bg-black/60" />

//         <Container className="relative py-10 sm:py-14 md:py-16 text-white">
//           <motion.div variants={fadeUp} initial="hidden" animate="show">
//             <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//               <div>
//                 <Badge variant="accent">Our Faculties</Badge>
//                 <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
//                   Learn from Experienced Mentors
//                 </h1>
//                 <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
//                   Search by name, department, qualification, topics, and experience.
//                 </p>

//                 <div className="mt-3 text-xs text-white/80">
//                   Showing <span className="font-semibold">{filtered.length}</span>{" "}
//                   {filtered.length === 1 ? "faculty" : "faculties"}
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//                 <Link to="/admission" className="w-full sm:w-auto">
//                   <Button className="w-full sm:w-auto bg-brand-primary hover:text-black hover:bg-white transition">
//                     Enquire Now
//                   </Button>
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="w-full sm:w-auto text-center rounded-xl px-4 py-2 text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition"
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </Container>
//       </section>

//       {/* FILTER BAR */}
//       <section className="py-8 sm:py-10 border-b border-neutral-200 bg-white">
//         <Container>
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={viewport}
//             variants={fadeUp}
//             className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6"
//           >
//             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//               <div>
//                 <div className="text-lg font-bold text-text-heading">Advanced Filters</div>
//                 <div className="mt-1 text-sm text-text-muted">
//                   Filter by department, qualification, experience, and keyword.
//                 </div>
//               </div>

//               <button
//                 onClick={clearFilters}
//                 className="w-full md:w-auto rounded-xl px-4 py-2 text-sm font-semibold border border-neutral-300 hover:bg-neutral-50 transition"
//               >
//                 Clear Filters
//               </button>
//             </div>

//             <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
//               {/* search */}
//               <div className="lg:col-span-2">
//                 <label className="text-xs font-semibold text-text-muted">Search</label>
//                 <input
//                   value={q}
//                   onChange={(e) => setQ(e.target.value)}
//                   placeholder="Search by name, subject, topics..."
//                   className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
//                 />
//               </div>

//               {/* dept */}
//               <div>
//                 <label className="text-xs font-semibold text-text-muted">Department</label>
//                 <select
//                   value={dept}
//                   onChange={(e) => setDept(e.target.value)}
//                   className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
//                 >
//                   {deptOptions.map((d) => (
//                     <option key={d} value={d}>
//                       {d}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* qualification */}
//               <div>
//                 <label className="text-xs font-semibold text-text-muted">Qualification</label>
//                 <select
//                   value={qual}
//                   onChange={(e) => setQual(e.target.value)}
//                   className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
//                 >
//                   {qualOptions.map((d) => (
//                     <option key={d} value={d}>
//                       {d}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* min exp */}
//               <div className="lg:col-span-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-xs font-semibold text-text-muted">Min experience (years)</label>
//                   <div className="text-xs text-text-muted">{minExp}+</div>
//                 </div>

//                 <input
//                   type="range"
//                   min={0}
//                   max={Math.max(10, Math.ceil(maxExp))}
//                   step={1}
//                   value={minExp}
//                   onChange={(e) => setMinExp(Number(e.target.value))}
//                   className="mt-2 w-full"
//                 />
//               </div>

//               {/* sort */}
//               <div className="lg:col-span-2">
//                 <label className="text-xs font-semibold text-text-muted">Sort by</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
//                 >
//                   <option value="name-asc">Name (A → Z)</option>
//                   <option value="exp-desc">Experience (High → Low)</option>
//                   <option value="dept-asc">Department (A → Z)</option>
//                 </select>
//               </div>
//             </div>
//           </motion.div>
//         </Container>
//       </section>

//       {/* GRID */}
//       <section className="py-10 sm:py-12">
//         <Container>
//           {filtered.length === 0 ? (
//             <div className="rounded-2xl border border-neutral-200 bg-surface-muted p-6 text-text-body">
//               No faculty found. Try adjusting filters.
//             </div>
//           ) : (
//             <>
//               <motion.div layout className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
//                 <AnimatePresence mode="popLayout">
//                   {visible.map((f) => (
//                     <motion.div
//                       key={String(f.id)} // stable key fixes "second filter not showing"
//                       layout
//                       variants={fadeUp}
//                       initial="hidden"
//                       animate="show"
//                       exit="exit"
//                       transition={{ duration: 0.25, ease: easeOut }}
//                     >
//                       <FacultyCard f={f} />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>

//               {filtered.length > visibleCount ? (
//                 <div className="mt-8 flex justify-center">
//                   <button
//                     onClick={() => setVisibleCount((v) => v + 9)}
//                     className="rounded-xl px-5 py-2 text-sm font-semibold border border-neutral-300 hover:bg-neutral-50 transition"
//                   >
//                     Load More
//                   </button>
//                 </div>
//               ) : null}
//             </>
//           )}

//           {/* NOTE */}
//           <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
//             <span className="font-semibold">Note:</span> Faculty photos can be added anytime.
//             Right now UI uses placeholders to match layout.
//           </div>
//         </Container>
//       </section>
//     </div>
//   );
// }

// function FacultyCard({ f }) {
//   return (
//     <div className="group rounded-3xl border border-neutral-200 bg-white overflow-hidden hover:shadow-soft transition">
//       {/* PHOTO */}
//       <div className="relative h-56 sm:h-60 bg-neutral-100 overflow-hidden">
//         {f.photo ? (
//           <img
//             src={f.photo}
//             alt={f.name}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center text-sm text-neutral-500">
//             Faculty Photo
//           </div>
//         )}

//         <div className="absolute top-3 right-3">
//           <span className="text-xs font-semibold rounded-full border border-white/30 bg-black/40 text-white px-3 py-1">
//             {f.department}
//           </span>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-5 sm:p-6">
//         <div className="flex items-start justify-between gap-3">
//           <div className="font-extrabold text-lg text-text-heading">{f.name}</div>
//         </div>

//         <div className="mt-2 text-sm text-neutral-600">
//           <span className="font-semibold">Experience:</span> {f.exp}
//         </div>

//         <div className="mt-1 text-sm text-neutral-600">
//           <span className="font-semibold">Qualification:</span> {f.qualification}
//         </div>

//         <p className="mt-4 text-sm text-neutral-600 leading-relaxed line-clamp-4">
//           {f.short}
//         </p>

//         <div className="mt-5">
//           <div className="text-sm font-bold text-text-heading">Key Focus</div>
//           <ul className="mt-2 grid gap-2">
//             {(f.bullets || []).slice(0, 4).map((b) => (
//               <li
//                 key={b}
//                 className="text-sm rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2"
//               >
//                 {b}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
