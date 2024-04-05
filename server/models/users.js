import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  allowEditContent: Boolean,
  allowDeleteExam: Boolean,
  allowAddCreateExam: Boolean,
  allowCreateContent: Boolean,
});

const examToTakeSchema = new mongoose.Schema({
  examId: String,
  score: Number,
  status: {
    type: String,
    enum: ["Completed", "Incomplete"],
    required: true,
  },
  attempts: {
    type: Number,
    default: 0, 
    required: true,
  },
  completionDate: {
    type: Date,
    required: false,
  },
});

const UserSchema = new mongoose.Schema({
  empID: { type: String, required: true },
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true },
  email: { type: String, required: true },
  user_role: { type: String, required: true },
  user_type: {
    type: String,
    enum: ["admin", "user", "co-admin"],
    required: true,
  },
  department: {
    type: String,
    enum: ["Technology", "Production", "HR", "Quality"],
    required: true,
  },

  usersExams: [examToTakeSchema],
  permissions: permissionSchema,
});

export const UserModel = mongoose.model("users", UserSchema);
