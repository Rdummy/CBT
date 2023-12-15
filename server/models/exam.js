import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  logo: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const ExamModel = mongoose.model("exams", ExamSchema);
