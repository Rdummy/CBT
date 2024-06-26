import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { UserModel } from "../models/users.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/profile", async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    
    const decoded = jwt.verify(token, "secret"); 
    const authenticatedUserId = decoded.id;

    const user = await UserModel.findById(authenticatedUserId);

    if (user) {
      
      res.json({
        username: user.username,
        user_type: user.user_type,
        user_role: user.user_role,
        email: user.email,
        department: user.department,
        imageUrl: user.imageUrl, 
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
    
    const decoded = jwt.verify(token, "secret"); 
    const authenticatedUserId = decoded.id;
    const existingUser = await UserModel.findById(authenticatedUserId);
    const updatedData = {
      username: req.body.username,
      user_role: req.body.user_role,
      email: req.body.email,
      imageUrl: existingUser.imageUrl, 
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      authenticatedUserId,
      { $set: updatedData },
      { new: true }
    );

    if (updatedUser) {
      
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

router.post("/uploadProfileImage", upload.single("image"), async (req, res) => {
  const token = req.header("Authorization");

  

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    const userId = decoded.id;

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { imageUrl: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile image updated successfully",
      imageUrl: updatedUser.imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as profileRouter };
