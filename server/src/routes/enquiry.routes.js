import { Router } from "express";
import Enquiry from "../models/Enquiry.js";

const router = Router();

function isValidEmail(email) {
  if (!email) return true;
  return /^\S+@\S+\.\S+$/.test(email);
}

router.post("/enquiries", async (req, res, next) => {
  try {
    const { fullName, phone, email, courseInterest, message } = req.body || {};

    if (!fullName?.trim()) return res.status(400).json({ message: "Full name is required" });
    if (!/^\d{10}$/.test((phone || "").trim()))
      return res.status(400).json({ message: "Valid 10-digit phone is required" });
    if (!courseInterest?.trim())
      return res.status(400).json({ message: "Course interest is required" });
    if (!isValidEmail((email || "").trim()))
      return res.status(400).json({ message: "Invalid email" });

    const enquiry = await Enquiry.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: (email || "").trim(),
      courseInterest: courseInterest.trim(),
      message: (message || "").trim(),
    });

    return res.status(201).json({ ok: true, id: enquiry._id });
  } catch (err) {
    next(err);
  }
});

// Optional: list enquiries (for admin later)
router.get("/enquiries", async (req, res, next) => {
  try {
    const items = await Enquiry.find().sort({ createdAt: -1 }).limit(50);
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

export default router;
