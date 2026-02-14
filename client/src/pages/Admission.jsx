import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import { apiPost } from "../app/api";
import Badge from "../components/ui/Badge";

const initial = {
  fullName: "",
  phone: "",
  email: "",
  courseInterest: "",
  message: "",
};

const easeOut = [0.16, 1, 0.3, 1];

export default function Admission() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter valid 10-digit phone";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Enter valid email";
    if (!form.courseInterest.trim()) e.courseInterest = "Select course interest";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setStatus({ type: "idle", message: "" });
    if (!validate()) return;

    try {
      setStatus({ type: "loading", message: "Submitting..." });
      await apiPost("/api/enquiries", form);
      setStatus({ type: "success", message: "Enquiry submitted successfully!" });
      setForm(initial);
      setErrors({});
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Failed to submit" });
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const viewport = { once: true, amount: 0.2 };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-page-hero bg-cover bg-center bg-fixed border-b border-neutral-200">
        <div className="absolute inset-0 bg-black/60" />
        <Container className="relative py-10 sm:py-14 md:py-16 text-white">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Badge variant="accent">Admission / Enquiry</Badge>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Fill the form below. We’ll contact you with details.
              </h1>
              <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                Share your details and preferred program. Our team will guide you with fees,
                schedule, and admission process.
              </p>
            </motion.div>

            {/* mini highlights */}
            <motion.div variants={fadeUp} className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              <MiniInfo title="Callback" value="Within 24–48 hrs" />
              <MiniInfo title="Mode" value="Call / WhatsApp" />
              <MiniInfo title="Support" value="Admission Guidance" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* FORM */}
      <section className="py-10 sm:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left info card (optional but nice) */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-1"
            >
              <motion.div variants={fadeUp} className="rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-soft transition">
                <div className="text-lg font-extrabold text-text-heading">What happens next?</div>
                <ul className="mt-4 space-y-3 text-sm text-text-body">
                  <li className="flex gap-2">
                    <span className="mt-[2px] h-5 w-5 rounded-full bg-brand-accentSoft border border-neutral-200 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    We review your enquiry and course interest.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[2px] h-5 w-5 rounded-full bg-brand-accentSoft border border-neutral-200 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    Our team contacts you on phone/WhatsApp.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[2px] h-5 w-5 rounded-full bg-brand-accentSoft border border-neutral-200 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    We share fees, schedule and admission steps.
                  </li>
                </ul>

                <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-text-muted">
                  Tip: Ensure your phone number is correct for faster callback.
                </div>
              </motion.div>
            </motion.div>

            {/* Right form card */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-2"
            >
              <motion.div variants={fadeUp} className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-7 md:p-8 hover:shadow-soft transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-text-heading">
                      Submit Enquiry
                    </div>
                    <div className="mt-2 text-sm sm:text-base text-text-body">
                      Fields marked with <span className="font-semibold">*</span> are required.
                    </div>
                  </div>
                  <div className="hidden md:block text-xs text-text-muted">
                    Secure form • No spam
                  </div>
                </div>

                <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                  <motion.div variants={fadeUp}>
                    <Input
                      label="Full Name *"
                      value={form.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      error={errors.fullName}
                      placeholder="Enter full name"
                    />
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid gap-5 md:grid-cols-2">
                    <Input
                      label="Phone Number *"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
                      error={errors.phone}
                      placeholder="10-digit phone"
                      maxLength={10}
                    />
                    <Input
                      label="Email (optional)"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="block">
                      <div className="text-sm font-medium mb-2">Course Interest *</div>
                      <select
                        value={form.courseInterest}
                        onChange={(e) => setField("courseInterest", e.target.value)}
                        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition bg-white
                          ${
                            errors.courseInterest
                              ? "border-red-500"
                              : "border-neutral-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-accentSoft"
                          }`}
                      >
                        <option value="">Select</option>
                        <option value="NEET 2-Year Program">NEET 2-Year Program</option>
                        <option value="NEET 1-Year Dropper Batch">NEET 1-Year Dropper Batch</option>
                        <option value="NEET Crash Course">NEET Crash Course</option>
                        <option value="11th + 12th Integrated">11th + 12th Integrated</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.courseInterest ? (
                        <div className="mt-1 text-xs text-red-600">{errors.courseInterest}</div>
                      ) : null}
                    </label>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Textarea
                      label="Message (optional)"
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder="Any specific query..."
                    />
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Button
                      className="bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white transition w-full sm:w-auto"
                      type="submit"
                      disabled={status.type === "loading"}
                    >
                      {status.type === "loading" ? "Submitting..." : "Submit Enquiry"}
                    </Button>

                    {status.type !== "idle" ? (
                      <div
                        className={`text-sm ${
                          status.type === "success"
                            ? "text-green-700"
                            : status.type === "error"
                            ? "text-red-700"
                            : "text-neutral-600"
                        }`}
                      >
                        {status.message}
                      </div>
                    ) : null}
                  </motion.div>

                  <div className="pt-1 text-xs text-text-muted">
                    By submitting, you agree to be contacted by phone/WhatsApp/email for enquiry follow-up.
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
      <div className="pointer-events-none fixed inset-0 z-0 flex items-end justify-end p-6 opacity-[0.1] select-none">
        <div className="text-right text-xs sm:text-sm md:text-base font-semibold tracking-widest text-white">
          @Unknown number<br />
          @~Hruday Pandit
        </div>
      </div>
    </div>
  );
}

function MiniInfo({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
      <div className="text-xs font-semibold text-white/80">{title}</div>
      <div className="mt-1 text-sm font-semibold text-white truncate">{value}</div>
    </div>
  );
}
