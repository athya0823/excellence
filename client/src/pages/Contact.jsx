import { useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import { siteConfig } from "../data/siteConfig";
import { apiPost } from "../app/api";
import Badge from "../components/ui/Badge";

const initial = { fullName: "", phone: "", email: "", message: "" };

export default function Contact() {
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

      // Save as enquiry (reuse same backend API)
      await apiPost("/api/enquiries", {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        courseInterest: "Contact Page",
        message: form.message
      });

      setStatus({ type: "success", message: "Message sent successfully!" });
      setForm(initial);
      setErrors({});
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Failed to send message" });
    }
  }

  return (
    <Container className="py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Contact info */}
        <div className="lg:col-span-1">
           <Badge variant="accent">Contact Us</Badge>
          <p className="mt-2 text-sm text-neutral-600">
            Reach us using the details below. You can also send a message using the form.
          </p>

          <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6">
            <div className="text-sm font-semibold text-neutral-600">Contact Person</div>
            <div className="mt-1 font-semibold">{siteConfig.contactPerson}</div>

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
                  className="mt-1 inline-block underline underline-offset-4"
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <div className="text-neutral-600 font-semibold">Email</div>
                <a
                  className="mt-1 inline-block underline underline-offset-4"
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
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold hover:bg-neutral-50 w-full"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 overflow-hidden">
            <div className="p-4 border-b border-neutral-200 bg-white">
              <div className="font-semibold">Location Map</div>
              <div className="text-xs text-neutral-500">
                (We can add Google Map embed once final link is shared)
              </div>
            </div>
            <div className="h-48 bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
            <div className="text-xl font-bold">Send us a message</div>
            <div className="mt-2 text-sm text-neutral-600">
              We’ll get back to you as soon as possible.
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

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={status.type === "loading"}>
                  Send Message
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
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
