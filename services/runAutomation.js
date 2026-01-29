import { wait } from "../utils/wait.js";
import { sendEmail } from "../utils/sendEmail.js";
import Automation from "../models/Automation.js";

export async function runAutomation(automation, email) {
  console.log("▶ Automation Started:", automation.name);

  const nodes = automation.nodes.filter(n => n.id !== "start" && n.id !== "end");

  let lastEmailUrl = null;

  for (const node of nodes) {
    if (node.type === "delay") {
      const { mode, delayValue, dateTime } = node.data;
      let waitTime = 0;
      if (mode === "relative") waitTime = parseDelay(delayValue);
      if (mode === "specific") waitTime = new Date(dateTime).getTime() - Date.now();
      if (waitTime > 0) await wait(waitTime);
    }

    if (node.type === "action") {
      const message = node.data.message || "No message";
      lastEmailUrl = await sendEmail(email, `Automation: ${automation.name}`, message);
    }
  }

  // Save Gmail link
  if (lastEmailUrl) {
    await Automation.findByIdAndUpdate(automation._id, { lastEmailUrl });
  }

  console.log("✅ Automation Finished");
};

function parseDelay(text) {
  if (!text) return 0;
  const num = parseInt(text);
  if (text.includes("minute")) return num * 60 * 1000;
  if (text.includes("hour")) return num * 60 * 60 * 1000;
  if (text.includes("day")) return num * 24 * 60 * 60 * 1000;
  return 0;
}
