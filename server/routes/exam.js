import express from "express";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.post("/exam", async (req, res) => {
  try {
    const { id, title, logo, description, status, createdAt } = req.body;

    const newExam = new ExamModel({
      id,
      title,
      logo,
      description,
      status,
      createdAt,
    });

    await newExam.save();

    res
      .status(201)
      .json({ message: "Exam created successfully", data: newExam });
  } catch (err) {
    console.error("Error creating exam:", err);
    res.status(500).json({ error: "Failed to create exam" });
  }
});

export { router as ExamRouter };
