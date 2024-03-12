import express from "express";
import mongoose from "mongoose";
import { ExamModel } from "../models/exam.js";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/assign-exam/:examId", async (req, res) => {
  try {
    const { assignedDepartment, numberOfParticipants } = req.body;
    const { examId } = req.params;

    const existingExam = await ExamModel.findById(examId);

    if (!existingExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    existingExam.assignedDepartment = assignedDepartment;
    existingExam.numberOfParticipants = numberOfParticipants;

    // Save the exam before assigning to users
    await existingExam.save();

    // Fetch users based on the department
    const query =
      assignedDepartment === "General"
        ? {}
        : { department: assignedDepartment };
    const users = await UserModel.find(query);

    // Assign exam to users
    const examToAssign = {
      examId: examId,
      score: 0,
      status: "Incomplete",
      attempts: 0,
    };

    for (let user of users) {
      // Check if the exam is already assigned
      const examIndex = user.usersExams.findIndex(
        (exam) => exam.examId === examId
      );
      if (examIndex === -1) {
        // Exam not found in user's exams
        user.usersExams.push(examToAssign);
      } else {
        // If the exam is already assigned, you might want to update it or leave as is.
        // This part can be customized based on the requirements.
      }
      await user.save();
    }

    res.status(201).json({
      message: "Exam assigned successfully to users",
      data: existingExam,
    });
  } catch (err) {
    console.error("Error assigning exam:", err);
    res.status(500).json({ error: "Failed to assign exam" });
  }
});

export { router as assignExamRouter };
