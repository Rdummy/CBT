import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the 'uploads' directory exists
const uploadDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const router = express.Router();

// Set up storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Endpoint to handle file upload for CKEditor
router.post("/ckeditor/upload", upload.single("upload"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Construct the URL to access the file
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    // Respond with the URL of the uploaded file; CKEditor 5 expects 'default' key for the image URL
    res.status(200).json({
      uploaded: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Static route to serve uploaded files
router.use("/uploads", express.static(uploadDir));

export { router as ckeditorRouter };
