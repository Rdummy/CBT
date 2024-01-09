import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email, user_role, user_type } = req.body;

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

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization; // Assuming token is sent in the authorization header
//   if (!token) {
//     return res.status(403).json({ message: "Token not provided" });
//   }

//   jwt.verify(token, "secret", (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// // Add a new endpoint to fetch user information based on the token
// router.get("/userinfo", verifyToken, async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Adjust the response as needed, providing relevant user information
//     res.json({
//       username: user.username,
//       user_type: user.user_type,
//       // Add other relevant user data here
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export { router as userRouter };
