import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { tableRouter } from "./routes/table_users.js";
import { examTitleRouter } from "./routes/exam_title.js";
import { takeExamRouter } from "./routes/take_exam.js";
import { slideRouter } from "./routes/slides.js";
import { resultRouter } from "./routes/result.js";
import { examDetailsRouter } from "./routes/exam-details.js";
import { profileRouter } from "./routes/settings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/table", tableRouter);
app.use("/exam", examTitleRouter);
app.use("/exam/:examId", takeExamRouter);
app.use("/create-content", slideRouter);
app.use("/result", resultRouter);
app.use("/exam-details", examDetailsRouter);
app.use("/settings", profileRouter);

mongoose.connect(
  "mongodb+srv://raineheartcajes:cbtexam@novatechset.pmauabk.mongodb.net/cbtdb?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server Started"));
