import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema({
  automationId: String,
  to: String,
  message: String,
  previewUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("EmailLog", EmailLogSchema);
