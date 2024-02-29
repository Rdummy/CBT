import express from "express";
import { ExamModel } from "../models/exam.js";
const router = express.Router();

router.get("/:examId/questions", async (req, res) => {
  const { examId } = req.params;

  try {
    const exam = await ExamModel.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    const questions = exam.questions;
    res.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as resultRouter };
