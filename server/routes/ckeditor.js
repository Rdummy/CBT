import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";


const uploadDir = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage });


router.post("/ckeditor/upload", upload.single("upload"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

   
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    
    res.status(200).json({
      uploaded: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.use("/uploads", express.static(uploadDir));

export { router as ckeditorRouter };
