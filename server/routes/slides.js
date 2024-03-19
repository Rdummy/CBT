import express from "express";
import { ExamModel } from "../models/exam.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();

// Define the base URL
const baseURL = "http://localhost:3001";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Go up one level from the routes directory and then into the uploads directory
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const maxFiles = 12; // Set this to the maximum number of files you expect
const multerFields = [];
for (let i = 0; i < maxFiles; i++) {
  multerFields.push({ name: `media${i}` });
}
router.post(
  "/slides/:examId",
  upload.fields(multerFields),
  async (req, res) => {
    try {
      const { examId } = req.params;
      const { title, description } = req.body;

      let media = [];
      for (let fieldName in req.files) {
        let fileArray = req.files[fieldName];
        for (let file of fileArray) {
          media.push({
            type: file.mimetype.includes("image")
              ? "Image"
              : file.mimetype.includes("video")
              ? "Video"
              : file.mimetype.includes("powerpoint") ||
                file.mimetype.includes("presentationml")
              ? "PowerPoint"
              : "Other",
            url: `${baseURL}/uploads/${file.filename}`, // Prepend the base URL
            fileName: file.originalname,
          });
        }
      }

      const newSlide = { title, description, media };

      const updatedExam = await ExamModel.findOneAndUpdate(
        { _id: examId },
        { $push: { "reviewerContent.slides": newSlide } },
        { new: true }
      );

      if (!updatedExam) {
        return res.status(404).send({ message: "Exam not found" });
      }

      res
        .status(200)
        .send({ message: "Slide added successfully!", updatedExam });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error", error: error.message });
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
