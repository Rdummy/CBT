import express from "express";
import { ExamModel } from "../models/exam.js"; // Adjust the path based on your project structure

const router = express.Router();

// Define a route to get questions for a specific exam
router.get("/:examId/questions", async (req, res) => {
  const { examId } = req.params;

  try {
    // Find the exam by its ID
    const exam = await ExamModel.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    // Extract questions from the exam and send them in the response
    const questions = exam.questions;
    res.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as resultRouter };
