import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import { siteConfig } from "../data/siteConfig";
import { apiPost } from "../app/api";
import Badge from "../components/ui/Badge";

const initial = { fullName: "", phone: "", email: "", message: "" };
const easeOut = [0.16, 1, 0.3, 1];

export default function Contact() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const [openMap, setOpenMap] = useState(false);


  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter valid 10-digit phone";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Enter valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setStatus({ type: "idle", message: "" });
    if (!validate()) return;

    try {
      setStatus({ type: "loading", message: "Submitting..." });

      await apiPost("/api/enquiries", {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        courseInterest: "Contact Page",
        message: form.message,
      });

      setStatus({ type: "success", message: "Message sent successfully!" });
      setForm(initial);
      setErrors({});
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Failed to send message" });
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
              <Badge variant="accent">Contact</Badge>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Fill the form below. We’ll contact you with details.
              </h1>
              <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                Reach us using the details below, or send a message using the form.
              </p>
            </motion.div>

            {/* quick contact strip */}
            <motion.div variants={fadeUp} className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              <MiniInfo title="Phone" value={siteConfig.phone} />
              <MiniInfo title="Email" value={siteConfig.email} />
              <MiniInfo title="Location" value="Pune, India" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* BODY */}
      <section className="py-10 sm:py-12">
        <Container>
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* LEFT: Info + Map */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="lg:col-span-1 space-y-6"
            >
              {/* Contact Info Card */}
              <motion.div variants={fadeUp} className="rounded-3xl border border-neutral-200 bg-white p-6 hover:shadow-soft transition">
                <div className="text-sm font-semibold text-neutral-600">Contact Person</div>
                <div className="mt-1 font-semibold text-text-heading">{siteConfig.contactPerson}</div>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <div className="text-neutral-600 font-semibold">Address</div>
                    <div className="mt-1 text-neutral-700 leading-relaxed">
                      {siteConfig.fullAddress}
                    </div>
                  </div>

                  <div>
                    <div className="text-neutral-600 font-semibold">Phone</div>
                    <a
                      className="mt-1 inline-block underline underline-offset-4 text-brand-primary font-semibold"
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    >
                      {siteConfig.phone}
                      {siteConfig.phone2}
                    </a>
                  </div>

                  <div>
                    <div className="text-neutral-600 font-semibold">Email</div>
                    <a
                      className="mt-1 inline-block underline underline-offset-4 text-brand-primary font-semibold break-all"
                      href={`mailto:${siteConfig.email}`}
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div className="pt-2">
                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-brand-primary text-white hover:text-black inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold hover:bg-white w-full transition"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
{/* rounded-3xl border border-neutral-200 bg-neutral-50 overflow-hidden p-2 hover:shadow-soft transition */}
              {/* Map Card */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden p-1 hover:shadow-soft transition">
                <div className="p-4 border-b border-neutral-200 bg-white">
                  <div className="font-semibold text-text-heading">Location Map</div>
                  <div className="text-xs text-neutral-500">Find us on Google Maps</div>
                </div>

                <div className="h-64 sm:h-72">
                  <iframe
                    title="SuPrabha Academy Location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60513.72497826915!2d73.7560908!3d18.5691776!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c11589d7310b%3A0xdaaf06695b9d491d!2sSuPrabha%20Academy!5e0!3m2!1sen!2sin!4v1770660416021!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="lg:col-span-2"
            >
              <motion.div variants={fadeUp} className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-7 md:p-8 hover:shadow-soft transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-text-heading">
                      Send us a message
                    </div>
                    <div className="mt-2 text-sm sm:text-base text-text-body">
                      We’ll get back to you as soon as possible.
                    </div>
                  </div>

                  <div className="hidden md:block text-xs text-text-muted">
                    Response time: 24–48 hrs
                  </div>
                </div>

                <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                  <Input
                    label="Full Name *"
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    error={errors.fullName}
                    placeholder="Enter your name"
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      label="Phone *"
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
                  </div>

                  <Textarea
                    label="Message *"
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    error={errors.message}
                    placeholder="Write your message..."
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Button
                      className="bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white transition w-full sm:w-auto"
                      type="submit"
                      disabled={status.type === "loading"}
                    >
                      {status.type === "loading" ? "Sending..." : "Send Message"}
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
                  </div>

                  {/* trust strip */}
                  <div className="pt-2 text-xs text-text-muted">
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

