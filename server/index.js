import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { tableRouter } from "./routes/table_users.js";
import { examTitleRouter } from "./routes/exam_title.js";
import { takeExamRouter } from "./routes/take_exam.js";
import { slideRouter } from "./routes/slides.js";
import { resultRouter } from "./routes/result.js";
import { examDetailsRouter } from "./routes/exam-details.js";
import { profileRouter } from "./routes/settings.js";
import { overviewRouter } from "./routes/overview-table.js";
import { assignExamRouter } from "./routes/assign-exam.js";
import { createExamRouter } from "./routes/create-exam.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", userRouter);
app.use("/table", tableRouter);
app.use("/exam", examTitleRouter);
app.use("/exam/:examId", takeExamRouter);
app.use("/create-content", slideRouter);
app.use("/result", resultRouter);
app.use("/exam-details", examDetailsRouter);
app.use("/settings", profileRouter);
app.use("/overview", overviewRouter);
app.use("/content", assignExamRouter);
app.use("/exam", createExamRouter);

mongoose.connect(
  "mongodb+srv://raineheartcajes:cbtexam@novatechset.pmauabk.mongodb.net/cbtdb?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server Started"));
