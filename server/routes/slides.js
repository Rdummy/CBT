import express from "express";
import { ExamModel } from "../models/exam.js";

const router = express.Router();

router.put(
  "/slides/:examId",
  express.json({ limit: "50mb" }),
  async (req, res) => {
    try {
      const { examId } = req.params; // Use examId from the route
      const { reviewerContent } = req.body;

      // Find the exam document by the provided examId
      const exam = await ExamModel.findById(examId);

      if (!exam) {
        return res.status(404).json({ error: "Exam not found" });
      }

      // Add the new slides to the slides array within reviewerContent
      reviewerContent.slides.forEach(({ title, description, imageUrl }) => {
        exam.reviewerContent.slides.push({ title, description, imageUrl });
      });

      // Save the updated exam document and get the updated document in the response
      const updatedExam = await exam.save();

      // Optionally, you can extract the added slides from the updated document
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
