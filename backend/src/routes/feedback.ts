import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const feedbackPath = path.join(__dirname, "../../feedback.json");

// POST /feedback
router.post("/", (req, res) => {
  const { productId, name, message } = req.body;
  if (!productId || !name || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  fs.readFile(feedbackPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read feedback" });
    const feedbacks = JSON.parse(data);
    const newFeedback = { productId, name, message };
    feedbacks.push(newFeedback);
    fs.writeFile(feedbackPath, JSON.stringify(feedbacks, null, 2), (err2) => {
      if (err2)
        return res.status(500).json({ error: "Failed to save feedback" });
      res.status(201).json({ message: "Feedback submitted successfully" });
    });
  });
});

// GET /feedback/:productId
router.get("/:productId", (req, res) => {
  fs.readFile(feedbackPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read feedback" });
    const feedbacks = JSON.parse(data);
    const productFeedbacks = feedbacks.filter(
      (f: any) => f.productId === req.params.productId
    );
    res.json(productFeedbacks);
  });
});

export default router;
