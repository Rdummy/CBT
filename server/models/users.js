import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // imageUrl: { type: String, required: true },
  email: { type: String, required: true },
  user_role: { type: String, required: true },
  user_type: { type: String, enum: ["admin", "user"], required: true },
  department: {
    type: String,
    enum: ["Technology", "Production", "HR", "Quality"],
    required: true,
  },
});

export const UserModel = mongoose.model("users", UserSchema);
