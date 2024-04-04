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

  
    await existingExam.save();

    
    const query =
      assignedDepartment === "General"
        ? {}
        : { department: assignedDepartment };
    const users = await UserModel.find(query);

    
    const examToAssign = {
      examId: examId,
      score: 0,
      status: "Incomplete",
      attempts: 0,
    };

    for (let user of users) {
     
      const examIndex = user.usersExams.findIndex(
        (exam) => exam.examId === examId
      );
      if (examIndex === -1) {
        
        user.usersExams.push(examToAssign);
      } else {
       
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
