import mongoose from "mongoose";

const ExamTitleSchema = new mongoose.Schema({
  //id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  //logo: { type: String, required: true },
  // status: { type: String, required: true },
  description: { type: String, required: true },
  // createdAt: { type: Date, required: true },
  //participants: { type: Number, required: true },
});

export const ExamTitleModel = mongoose.model("exam_titles", ExamTitleSchema);
