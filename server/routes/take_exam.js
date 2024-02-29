import express from "express";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.get("/take-exam/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    const data = await ExamModel.findById(examId);

    if (!data) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as takeExamRouter };
