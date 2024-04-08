import express from "express";

import { ExamModel } from "../models/exam.js";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/barchart", async (req, res) => {
  try {
    const exams = await ExamModel.find();
    let data = [];
    const totalUsers = await UserModel.countDocuments();

    for (let exam of exams) {
      const aggregation = await UserModel.aggregate([
        { $unwind: "$usersExams" },
        
        { $match: { "usersExams.examId": exam._id.toString() } },
        {
          $group: {
            _id: "$usersExams.status",
            count: { $sum: 1 }
          }
        }
      ]);

    
      const completedCount = aggregation.find(group => group._id === "Completed")?.count || 0;
      const incompleteCount = aggregation.find(group => group._id === "Incomplete")?.count || 0;

      
      let totalParticipants;
      if (exam.assignedDepartment === "General") {
        totalParticipants = totalUsers;
      } else {
        totalParticipants = exam.numberOfParticipants || 10;
      }

      
      const actualIncomplete = totalParticipants - completedCount;

      
      // console.log(`Exam: ${exam.title}`);
      // console.log(`Completed Count (via Aggregation): ${completedCount}`);
      // console.log(`Incomplete Count (via Aggregation): ${incompleteCount}`);
      // console.log(`Total Participants: ${totalParticipants}`);

      
      data.push({
        _id: exam._id,
        examTitle: exam.title,
        Completed: completedCount,
        Incomplete: actualIncomplete > 0 ? actualIncomplete : 0,
        assignedDepartment: exam.assignedDepartment,
      });
    }

    
    console.log("Bar Chart Data:", data);

   
    res.json(data);
  } catch (err) {
    console.error("Error at /barchart endpoint:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.get("/usersByExam/:examId", async (req, res) => {
  try {
    const examId = req.params.examId;
    const users = await UserModel.find({
      "usersExams.examId": examId,
    }).select("-password -__v");

    
    users.forEach(user => {
      const userExam = user.usersExams.find(ue => ue.examId.toString() === examId);
      console.log(`User: ${user._id}, Status: ${userExam ? userExam.status : 'Not Found'}`);
    });

    res.json(users);
  } catch (error) {
    console.error(`Failed to fetch users by exam ${req.params.examId}:`, error);
    res.status(500).send("Error fetching users by exam");
  }
});

export { router as overviewRouter };
