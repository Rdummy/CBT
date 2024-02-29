import express from "express";

import { ExamModel } from "../models/exam.js";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/barchart", async (req, res) => {
  try {
    const exams = await ExamModel.find();
    let data = [];
    // Fetching the total number of users for the General
    const totalUsers = await UserModel.countDocuments();

    for (let exam of exams) {
      const completedCount = await UserModel.countDocuments({
        "usersExams.examId": exam._id,
        "usersExams.status": "Completed",
      });

      let totalParticipants;
      if (exam.assignedDepartment === "General") {
        totalParticipants = totalUsers; //total user count for General
      } else {
        totalParticipants = exam.numberOfParticipants || 10;
      }

      const actualIncomplete = totalParticipants - completedCount;

      data.push({
        _id: exam._id,
        examTitle: exam.title,
        Completed: completedCount,
        Incomplete: actualIncomplete > 0 ? actualIncomplete : 0,
        assignedDepartment: exam.assignedDepartment,
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/usersByExam/:examId", async (req, res) => {
  try {
    const examId = req.params.examId;

    const users = await UserModel.find({
      "usersExams.examId": examId,
    }).select("-password -__v"); // Select all fields except password and version key

    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users by exam", error);
    res.status(500).send("Error fetching users by exam");
  }
});

export { router as overviewRouter };
