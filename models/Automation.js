import mongoose from "mongoose";

const AutomationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  nodes: { type: Array, default: [] }, 
  edges: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Automation = mongoose.model("Automation", AutomationSchema);
export default Automation;