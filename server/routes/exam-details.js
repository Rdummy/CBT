import express from "express";

import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.get("/exam/:id", async (req, res) => {
  try {
    const exam = await ExamModel.findOne({ id: req.params._id });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exam);
  } catch (err) {
    console.error("Error fetching exam by ID:", err);
    res.status(500).json({ message: "Failed to fetch exam by ID" });
  }
});

export { router as examDetailsRouter };
