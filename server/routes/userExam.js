import express from "express";
import { UserModel } from "../models/users.js";
import { ExamModel } from "../models/exam.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

router.post("/examResult", async (req, res) => {
  const { examId, status, score } = req.body;
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    const username = decoded.username;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userExamEntry = user.usersExams.find(
      (exam) => exam.examId === examId
    );

    if (
      !userExamEntry ||
      (userExamEntry && userExamEntry.status !== "Completed")
    ) {
      const examUpdate = await ExamModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(examId) },
        { $inc: { numberOfParticipants: -1 } },
        { new: true }
      );

      if (!examUpdate) {
        return res.status(404).json({ message: "Exam not found" });
      }
    }

    if (!userExamEntry) {
      user.usersExams.push({ examId, score, status });
    } else {
      userExamEntry.status = status;
      userExamEntry.score = score;
    }

    await user.save();

    res.status(201).json({ message: "Exam result added successfully" });
  } catch (error) {
    console.error("Error saving exam result:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as userExamRouter };
