import express from "express";

import { ExamModel } from "../models/exam.js";
import { UserModel } from "../models/users.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/barchart", async (req, res) => {
  try {
    const exams = await ExamModel.find();
    let data = [];
    // Fetch total number of users for the 'General' department case
    const totalUsers = await UserModel.countDocuments();

    for (let exam of exams) {
      const completedCount = await UserModel.countDocuments({
        "usersExams.examId": exam._id,
        "usersExams.status": "Completed",
      });

      // Determine the number of participants based on assignedDepartment
      let totalParticipants;
      if (exam.assignedDepartment === "General") {
        totalParticipants = totalUsers; // Use total user count for 'General'
      } else {
        totalParticipants = exam.numberOfParticipants || 10; // Use the number from the exam or default to 10
      }

      const actualIncomplete = totalParticipants - completedCount;

      data.push({
        _id: exam._id, // Include this line to ensure the _id is sent to the frontend
        examTitle: exam.title,
        Completed: completedCount,
        Incomplete: actualIncomplete > 0 ? actualIncomplete : 0,
        assignedDepartment: exam.assignedDepartment, // This was added previously
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
