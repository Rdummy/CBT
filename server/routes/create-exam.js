import express from "express";

import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.post("/create-exam/:examId/questions", async (req, res) => {
  const { examId } = req.params;
  const { questions } = req.body;

  

  try {
    let exam = await ExamModel.findOne({ _id: examId });

    if (exam) {
      exam.questions.push(...questions);
      await exam.save();
      res.status(200).json({ message: "Questions added to exam successfully" });
    } else {
      console.log(`No exam found with id: ${examId}`);
      res.status(404).json({ error: "Exam not found" });
    }
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export { router as createExamRouter };
