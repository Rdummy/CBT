import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { tableRouter } from "./routes/table_users.js";
import { examTitleRouter } from "./routes/exam_title.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/auth", tableRouter);
app.use("/exam-title", examTitleRouter);

mongoose.connect(
  "mongodb+srv://raineheartcajes:cbtexam@novatechset.pmauabk.mongodb.net/cbtdb?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server Started"));
