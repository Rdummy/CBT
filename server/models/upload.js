import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming examId is an ObjectId
    required: true,
    ref: "Exam", // Assuming you have an Exam model
  },
  urlLink: {
    type: String,
    required: true, // Assuming you want this field to be required
  },
});

export const UploadModel = mongoose.model("Upload", UploadSchema);
