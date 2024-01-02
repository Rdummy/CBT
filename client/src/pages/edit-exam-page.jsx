import React, { useState, useEffect } from "react";
import exams from "../models/exam-data";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the specific exam data based on the examId
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
    // Find the index of the exam in the examsData array
    const examIndex = exams.findIndex((exam) => exam.id === examId);

    // Create a copy of the examsData array to avoid directly mutating state
    const updatedExams = [...exams];

    // Update the selected exam's title and description
    updatedExams[examIndex] = {
      ...updatedExams[examIndex],
      title: formData.title,
      description: formData.description,
    };

    // Update the state or perform any necessary actions like API calls to update the data
    // For simplicity, here we're just logging the updated data
    console.log("Updated Exams Data:", updatedExams);

    // Redirect to a different route after successful update
    navigate("/dashboard"); // You may navigate to a specific route
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Exam
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EditExamPage;
