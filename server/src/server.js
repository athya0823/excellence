import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import { connectDb } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";




dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api", healthRoutes);
app.use("/api", enquiryRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("NEET Excellence API is running ");
});
app.get("/api", (req, res) => {
  res.json({ status: "ok", message: "API working" });
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(` API running on http://localhost:${PORT}`));
})();
