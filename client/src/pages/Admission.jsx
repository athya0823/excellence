import { useState } from "react";
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

export default function Admission() {
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

  return (
    <div>
       <section className="relative border-b border-neutral-200"
        style={{
          backgroundImage: "url('/src/assets/gallery/classroom-2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          <div className="absolute inset-0 bg-black/50"></div>
      
        <div className="relative z-10">
                    <Container className="py-14 text-white">
                          <Badge variant="accent">Admission / Enquiry</Badge>
                          <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                            Fill the form below. We’ll contact you with details.
                          </h1>
                          {/* <p className="mt-4 text-text-body">
                            NEET-focused strategies, tips, and guidance.
                          </p> */}
                      </Container>
                      </div>
                  </section>

    <Container className="py-12">
      <div className="max-w-3xl ">
        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <Input
            label="Full Name *"
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            error={errors.fullName}
            placeholder="Enter full name"
          />

          <div className="grid gap-5 md:grid-cols-2">
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
          </div>

          <label className="block">
            <div className="text-sm font-medium mb-2">Course Interest *</div>
            <select
              value={form.courseInterest}
              onChange={(e) => setField("courseInterest", e.target.value)}
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition
                ${errors.courseInterest ? "border-red-500" : "border-neutral-300 focus:border-black"}`}
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

          <Textarea
            label="Message (optional)"
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            placeholder="Any specific query..."
          />

          <div className="flex items-center gap-3">
            <Button className="bg-brand-primary hover:text-black rounded-xl border border-neutral-300 hover:bg-white" type="submit" disabled={status.type === "loading"}>
              Submit Enquiry
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
    </Container>
    </div>
  );
}
