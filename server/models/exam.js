import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Image", "Video", "PowerPoint", "Other"],
    required: true,
  },
  url: { type: String, required: true },
  fileName: { type: String, required: true },
});

const slideSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [mediaSchema], 
});

const questionSchema = new mongoose.Schema({
  question: String,
  choices: [{ text: String }],
  correctAnswer: Number,
});

const examSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    title: String,
    logo: String,
    description: String,
    status: String,
    reviewerContent: {
      slides: [slideSchema],
    },
    instructions: String,
    numberOfParticipants: Number,
    assignedDepartment: {
      type: String,
      enum: ["Technology", "Production", "HR", "Quality", "General"],
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

export const ExamModel = mongoose.model("exams", examSchema);
