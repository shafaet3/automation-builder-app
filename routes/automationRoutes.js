//routes/automationRoutes.js:

import express from "express";
import Automation from "../models/Automation.js";
import { runAutomation } from "../services/runAutomation.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const data = await Automation.create(req.body);
    res.json(data);
  } catch (error) {
    if (error.code === 11000) {
      // Mongo duplicate key
      return res.status(400).json({ error: "Automation name already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const list = await Automation.find();
  res.json(list);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const item = await Automation.findById(req.params.id);
  res.json(item);
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Automation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Automation name already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Automation.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// TEST RUN AUTOMATION (BACKGROUND)
router.post("/:id/test", async (req, res) => {
  try {
    const { email } = req.body;

    const automation = await Automation.findById(req.params.id);

    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }

    // Run async safely
    runAutomation(automation, email).catch(console.error);

    res.json({ success: true, message: "Automation started" });

  } catch (error) {
    console.error("Test Error:", error);
    res.status(500).json({ error: "Test failed" });
  }
});


export default router;
