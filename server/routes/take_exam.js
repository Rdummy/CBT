import express from "express";

import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.get("/take-exam/:examId", async (req, res) => {
  try {
    const data = await ExamModel.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as takeExamRouter };
