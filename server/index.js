import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import multer from "multer";

import { userRouter } from "./routes/users.js";
import { tableRouter } from "./routes/table_users.js";
import { examTitleRouter } from "./routes/exam_title.js";
import { takeExamRouter } from "./routes/take_exam.js";
import { slideRouter } from "./routes/slides.js";
import { resultRouter } from "./routes/result.js";
import { examDetailsRouter } from "./routes/exam-details.js";
import { overviewTableRouter } from "./routes/overview-table.js";
import { profileRouter } from "./routes/settings.js";
import { overviewRouter } from "./routes/overview.js";
import { assignExamRouter } from "./routes/assign-exam.js";
import { createExamRouter } from "./routes/create-exam.js";
import { userExamRouter } from "./routes/userExam.js";
import { ckeditorRouter } from "./routes/ckeditor.js";

import { fileURLToPath } from "url";
// import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const uploadPath = path.join(__dirname, "../client/public/uploads");
app.use("/uploads", express.static(uploadPath));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter);
app.use("/table", tableRouter);
app.use("/exam", examTitleRouter);
app.use("/exam/:examId", takeExamRouter);
app.use("/create-content", slideRouter);
app.use("/result", resultRouter);
app.use("/exam-details", examDetailsRouter);
app.use("/settings", profileRouter);
app.use("/overview-table", overviewTableRouter);
app.use("/content", assignExamRouter);
app.use("/exam", createExamRouter);
app.use("/user", userExamRouter);
app.use("/overview", overviewRouter);
app.use(ckeditorRouter);

mongoose.connect(
  "mongodb+srv://raineheartcajes:cbtexam@novatechset.pmauabk.mongodb.net/cbtdb?retryWrites=true&w=majority"
);

// Comment sample sdfsdfdsfsdfsdfdfdfdfsd

app.listen(3001, () => console.log("Server Started"));
  