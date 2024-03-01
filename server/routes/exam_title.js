import express from "express";
import jwt from "jsonwebtoken";
import { ExamModel } from "../models/exam.js";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/exam-title", async (req, res) => {
  try {
    const { title, description, id } = req.body;

    const newExam = new ExamModel({
      title,
      description,
      id,
    });

    await newExam.save();

    res
      .status(201)
      .json({ message: "Exam created successfully", data: newExam });
  } catch (err) {
    console.error("Error creating exam:", err);
    res.status(500).json({ error: "Failed to create exam" });
  }
});

router.get("/content/exam-title", async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};
    if (department) {
      query.$or = [
        { assignedDepartment: department },
        { assignedDepartment: "General" },
      ];
    }

    const exams = await ExamModel.find(query);
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/exam-title", async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    const userDepartment = decoded.department;

    const query = {
      $or: [
        { assignedDepartment: userDepartment },
        { assignedDepartment: "General" },
      ],
    };

    const exams = await ExamModel.find(query);

    res.json(exams);
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get("/content-title/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    console.log(examId);
    const data = await ExamModel.findById(examId);
    console.log(data);
    if (!data) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-exam/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await ExamModel.deleteOne({ _id: examId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Exam not found" });
    }
    res.send({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export { router as examTitleRouter };
