import express from "express";
import { ExamTitleModel } from "../models/exam_title.js";

const router = express.Router();

router.post("/exam-title", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newExam = new ExamTitleModel({
      title,
      description,
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

export { router as examTitleRouter };
