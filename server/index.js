import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { tableRouter } from "./routes/table_users.js";
import { ExamRouter } from "./routes/exam.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/auth", tableRouter);
app.use("/exam", ExamRouter);

mongoose.connect(
  "mongodb+srv://raineheartcajes:novatechset2023@novatechset.pmauabk.mongodb.net/sample?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("Server Started"));
