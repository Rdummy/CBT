import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
  urlLink: {
    type: String,
    required: true,
  },
});

export const UploadModel = mongoose.model("Upload", UploadSchema);
