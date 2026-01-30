import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    courseInterest: { type: String, required: true, trim: true },
    message: { type: String, trim: true, default: "" },
    status: { type: String, default: "new" }, // new, contacted, closed (future)
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
