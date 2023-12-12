const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing

const userSchema = new mongoose.Schema({
  // User details

  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,

    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  // Roles and permissions
  userType: [
    {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  ],
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Export user model
module.exports = mongoose.model("User", userSchema);
