import express from "express";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.put(
  "/slides/:examId",
  express.json({ limit: "50mb" }),
  async (req, res) => {
    try {
      const { examId } = req.params;
      const { reviewerContent } = req.body;

      const exam = await ExamModel.findById(examId);

      if (!exam) {
        return res.status(404).json({ error: "Exam not found" });
      }

      // Adding new slides to the slides array for the reviewerContent
      reviewerContent.slides.forEach(({ title, description, imageUrl }) => {
        exam.reviewerContent.slides.push({ title, description, imageUrl });
      });

      const updatedExam = await exam.save();

      const addedSlides = updatedExam.reviewerContent.slides.slice(
        -reviewerContent.slides.length
      );

      res.status(200).json({
        message: "Slides added successfully",
        slides: addedSlides,
      });
    } catch (err) {
      console.error("Error adding slides:", err);
      return res.status(500).json({ error: "Failed to add slides" });
    }
  }
);

router.get("/slides/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await ExamModel.findOne({ id: examId });

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json({ slides: exam.reviewerContent.slides });
  } catch (err) {
    console.error("Error fetching slides:", err);
    return res.status(500).json({ error: "Failed to fetch slides" });
  }
});

export { router as slideRouter };
