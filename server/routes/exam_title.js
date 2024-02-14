import express from "express";

import { ExamModel } from "../models/exam.js";

const router = express.Router();

const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

router.post("/exam-title", async (req, res) => {
  try {
    const { title, description, id } = req.body;

    const newExam = new ExamModel({
      title,
      description,
      id,
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

router.get("/exam-title", async (req, res) => {
  try {
    const data = await ExamModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

export { router as examTitleRouter };
