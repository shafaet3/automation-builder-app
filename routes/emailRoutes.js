import express from "express";
import EmailLog from "../models/EmailLog.js";

const router = express.Router();

router.get("/:automationId", async (req, res) => {
  const logs = await EmailLog.find({ automationId: req.params.automationId })
    .sort({ createdAt: -1 });

  res.json(logs);
});

export default router;
