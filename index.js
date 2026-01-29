import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import automationRoutes from "./routes/automationRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://automation-builder-frontend.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.use("/automations", automationRoutes);
app.use("/emails", emailRoutes);
// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
}

connectDB();

// Prevent crash on async errors
process.on("uncaughtException", err => {
  console.error("❌ Uncaught Exception:", err.message);
});

process.on("unhandledRejection", err => {
  console.error("❌ Unhandled Promise Rejection:", err);
});
