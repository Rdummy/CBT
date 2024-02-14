import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});

const questionSchema = new mongoose.Schema({
  type: String,
  question: String,
  choices: [
    {
      text: String,
      isCorrect: mongoose.Schema.Types.Mixed, // Allow different data types, including boolean
    },
  ],
  // correctAnswer: Number, // Remove this line
  // explanation: String,
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
  assignedDepartment: {
    type: String,
    enum: ["Technology", "Production", "HR", "Quality", "General"],
  },
  questions: [questionSchema],
});

export const ExamModel = mongoose.model("exams", examSchema);
