import express from "express";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.put("/slides", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    // Replace with the actual exam ID
    const examId = "659f446b7d8cfd3d4a68ba92";
    // Find the exam document by ID
    const exam = await ExamModel.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    // Add the new slide to the slides array within reviewerContent
    exam.reviewerContent.slides.push({
      title,
      description,
      imageUrl,
    });

    // Save the updated exam document and get the updated document in the response
    const updatedExam = await exam.save();

    const addedSlide =
      updatedExam.reviewerContent.slides[
        updatedExam.reviewerContent.slides.length - 1
      ];

    res.status(200).json({
      message: "Slide added successfully",
      slide: addedSlide,
    });
  } catch (err) {
    console.error("Error adding slide:", err);
    return res.status(500).json({ error: "Failed to add slide" });
  }
});

export { router as slideRouter };
