import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token to get the authenticated user ID
    const decoded = jwt.verify(token, "secret"); // Replace with your actual secret key
    const authenticatedUserId = decoded.id;

    const user = await UserModel.findById(authenticatedUserId);

    if (user) {
      // Return the user profile information
      res.json({
        username: user.username,
        user_type: user.user_type,
        user_role: user.user_role,
        email: user.email,
        department: user.department,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});

router.put("/updateUserData", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token to get the authenticated user ID
    const decoded = jwt.verify(token, "secret"); // Replace with your actual secret key
    const authenticatedUserId = decoded.id;

    // Update user data in MongoDB
    const updatedUser = await UserModel.findByIdAndUpdate(
      authenticatedUserId,
      {
        $set: {
          username: req.body.username,
          user_role: req.body.user_role,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (updatedUser) {
      // Return the updated user profile information
      res.json({
        username: updatedUser.username,
        user_type: updatedUser.user_type,
        user_role: updatedUser.user_role,
        email: updatedUser.email,
        department: updatedUser.department,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});

export { router as profileRouter };
