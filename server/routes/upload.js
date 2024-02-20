// import express from "express";
// import multer from "multer";
// import path from "path";
// import { UserModel } from "../models/user.js"; // Adjust the import path as necessary

// const router = express.Router();

// // Multer setup (assuming you've configured it as previously described)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

// // POST route to handle file upload and update user's imageUrl
// router.post("/upload/:userId", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   // Construct the URL to access the file
//   const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
//     req.file.filename
//   }`;

//   try {
//     // Update the user's imageUrl with the new fileUrl
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       req.params.userId,
//       {
//         imageUrl: fileUrl,
//       },
//       { new: true }
//     ); // Return the updated document

//     if (!updatedUser) {
//       return res.status(404).send("User not found.");
//     }

//     res
//       .status(200)
//       .send({ message: "Image uploaded successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res
//       .status(500)
//       .send({ message: "Failed to update user", error: error.message });
//   }
// });

// export { router as uploadRouter };
