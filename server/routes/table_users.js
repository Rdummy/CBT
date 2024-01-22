import express from "express";

import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:_id", async (req, res) => {
  const userId = req.params._id;

  try {
    // Find the user by ID and remove it from the database
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as tableRouter };
