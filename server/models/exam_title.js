import mongoose from "mongoose";

const ExamTitleSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: String,
});

export const ExamTitleModel = mongoose.model("exam_titles", ExamTitleSchema);
