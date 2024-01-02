import React, { useState, useEffect } from "react";
import exams from "../models/exam-data";
<<<<<<< HEAD
import { Container, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
=======
import { Button, Box, Typography, TextField } from "@mui/material";
>>>>>>> c446071c553982ae2e60681c5023d4aa2009183a

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
<<<<<<< HEAD
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
=======
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
        <TextField type="text" id="title" name="title" size="small"/>
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
        <Button type="submit" className="brand-blue-bg"  sx={{px:2,py:0.6, borderRadius: "0rem"}}> Submit </Button>
      </form>
    </Box>
>>>>>>> c446071c553982ae2e60681c5023d4aa2009183a
  );
};

export default EditExamPage;
