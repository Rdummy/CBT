import express from "express";

import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.get("/content-title/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    console.log(examId);
    const data = await ExamModel.findById(examId);
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as assignExamRouter };
