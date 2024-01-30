import express from "express";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/user-profile/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const userProfile = await UserModel.findOne({ username });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      username: userProfileUsername,
      user_role,
      user_type,
      email,
      department,
    } = userProfile;

    res.status(200).json({
      username: userProfileUsername,
      user_role,
      user_type,
      email,
      department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as profileRouter };
