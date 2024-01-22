import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});

const questionSchema = new mongoose.Schema({
  type: String,
  question: String,
  choices: [String],
  correctAnswer: Number,
  explanation: String,
});

const examSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  logo: String,
  description: String,
  status: String,
  createdAt: Date,
  reviewerContent: {
    slides: [slideSchema],
  },
  instructions: String,
  questions: [questionSchema],
});

export const ExamModel = mongoose.model("exams", examSchema);
