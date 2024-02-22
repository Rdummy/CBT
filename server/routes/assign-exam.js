import express from "express";
import mongoose from "mongoose";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.post("/assign-exam/:examId", async (req, res) => {
  try {
    const { assignedDepartment, numberOfParticipants } = req.body; // Include numberOfParticipants in the destructuring
    const { examId } = req.params;

    const existingExam = await ExamModel.findById(examId);

    if (!existingExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    existingExam.assignedDepartment = assignedDepartment;
    existingExam.numberOfParticipants = numberOfParticipants; // Set the numberOfParticipants field

    await existingExam.save();

    res
      .status(201)
      .json({ message: "Exam assigned successfully", data: existingExam });
  } catch (err) {
    console.error("Error assigning exam:", err);
    res.status(500).json({ error: "Failed to assign exam" });
  }
});

export { router as assignExamRouter };
