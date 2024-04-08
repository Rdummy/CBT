import React, { useState, useEffect } from "react";
import exams from "../models/exam-data";
import { Button, Box, Typography, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
   
    const selectedExam = exams.find((exam) => exam.id === examId);
    if (selectedExam) {
      setFormData({
        title: selectedExam.title,
        description: selectedExam.description,
      });
    }
  }, [examId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const examIndex = exams.findIndex((exam) => exam.id === examId);

    const updatedExams = [...exams];

    updatedExams[examIndex] = {
      ...updatedExams[examIndex],
      title: formData.title,
      description: formData.description,
    };

    

    navigate("/dashboard");
  };

  return (
    // <div>
    //   <h1>Edit Exam</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="title">Title:</label>
    //     <input type="text" id="title" name="title" />

    //     <label htmlFor="description">Description:</label>
    //     <textarea
    //       id="description"
    //       name="description"
    //       rows="4"
    //       cols="50"
    //     ></textarea>

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <Box>
      <Typography variant="h3"> Edit Exam</Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title: </label>
        <br />
        <TextField type="text" id="title" name="title" size="small" />
        <br />
        <br />
        <label htmlFor="title"> Description: </label>
        <br />
        <TextField
          id="description"
          name="description"
          multiline
          size="small"
          rows={3}
          maxRows={4}
          style={{ width: "50rem", height: "5rem" }}
        />
        <br />
        <br />
        <Button
          type="submit"
          className="brand-blue-bg"
          sx={{ px: 2, py: 0.6, borderRadius: "0rem" }}
        >
          {" "}
          Submit{" "}
        </Button>
      </form>
    </Box>
  );
};

export default EditExamPage;
