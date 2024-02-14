import express from "express";
import mongoose from "mongoose";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.post("/assign-exam/:examId", async (req, res) => {
  try {
    const { assignedDepartment } = req.body;
    const { examId } = req.params;

    const existingExam = await ExamModel.findById(examId);

    if (!existingExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    existingExam.assignedDepartment = assignedDepartment;

    await existingExam.save();

    res
      .status(201)
      .json({ message: "Exam assigned successfully", data: existingExam });
  } catch (err) {
    console.error("Error assigning exam:", err);
    res.status(500).json({ error: "Failed to assign exam" });
  }
});

router.post("/create-exam/:examId/questions", async (req, res) => {
  const { examId } = req.params;
  const { questions } = req.body;

  try {
    // Format the questions array to match your Exam model
    const formattedQuestions = questions.map((q) => ({
      type: "multiple-choice", // Assuming a default type for the question
      question: q.question,
      choices: q.choices.map((choice) => ({
        text: choice.text,
        isCorrect: choice.isCorrect,
      })),
      correctAnswer: q.correctAnswer,
    }));

    const exam = new ExamModel({
      id: examId,
      questions: formattedQuestions,
    });

    await exam.save();
    res.status(201).json({ message: "Exam saved successfully" });
  } catch (error) {
    console.error("Error saving exam:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as assignExamRouter };
