"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const feedbackPath = path_1.default.join(__dirname, "../../feedback.json");
// POST /feedback
router.post("/", (req, res) => {
    const { productId, name, message } = req.body;
    if (!productId || !name || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    fs_1.default.readFile(feedbackPath, "utf-8", (err, data) => {
        if (err)
            return res.status(500).json({ error: "Failed to read feedback" });
        const feedbacks = JSON.parse(data);
        const newFeedback = { productId, name, message };
        feedbacks.push(newFeedback);
        fs_1.default.writeFile(feedbackPath, JSON.stringify(feedbacks, null, 2), (err2) => {
            if (err2)
                return res.status(500).json({ error: "Failed to save feedback" });
            res.status(201).json({ message: "Feedback submitted successfully" });
        });
    });
});
exports.default = router;
