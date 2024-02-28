import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email, user_role, user_type, department } =
    req.body;

  // Define a default image URL
  const defaultImageUrl =
    "https://example.com/path/to/default/profile/image.png";

  try {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      user_role,
      user_type,
      department,
      imageUrl: defaultImageUrl, // Set the default imageUrl for new users
    });

    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Include the department in the JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        user_type: user.user_type,
        department: user.department, // Add this line
      },
      "secret", // Replace "secret" with your actual secret, ideally from an environment variable
      { expiresIn: "48h" } // Optional: Set an expiration for the token
    );

    res.json({
      token,
      userID: user._id,
      username: user.username,
      department: user.department,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user_type", async (req, res) => {
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
      res.json({ user_type: user.user_type });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});

router.get("/username", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token to get the authenticated user ID and username
    const decoded = jwt.verify(token, "secret"); // Replace with your actual secret key
    const authenticatedUserId = decoded.id;

    const user = await UserModel.findById(authenticatedUserId);

    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});

export { router as userRouter };
