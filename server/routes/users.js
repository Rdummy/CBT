import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email, user_role, user_type, department } =
    req.body;

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
      imageUrl: defaultImageUrl,
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

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        user_type: user.user_type,
        department: user.department,
      },
      "secret",
      { expiresIn: "48h" }
    );

    res.json({
      token,
      userID: user._id,
      username: user.username,
      user_type: user.user_type,
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
    const decoded = jwt.verify(token, "secret");
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
    const decoded = jwt.verify(token, "secret");
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

router.put("/users/:userId/update", async (req, res) => {
  const { userId } = req.params;
  const { user_type, permissions } = req.body; // Expecting both user_type and permissions

  // Basic validation
  if (!permissions || typeof permissions.allowEditContent !== "boolean") {
    return res.status(400).json({ message: "Invalid permissions data" });
  }
  if (user_type !== "co-admin") {
    return res.status(400).json({ message: "Invalid user type" });
  }

  // Authorization check (Implement according to your auth system)
  // For example, ensure the requester is an admin

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { user_type, permissions },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating user", error: error.message });
  }
});

export { router as userRouter };
