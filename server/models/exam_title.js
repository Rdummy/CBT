import mongoose from "mongoose";

const ExamTitleSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: String,
});

export const ExamTitleModel = mongoose.model("exam_title", ExamTitleSchema);
