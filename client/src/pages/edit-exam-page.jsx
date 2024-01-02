import React, { useState } from "react";
import exams from "../models/exam-data";
import { Button, Box, Typography, TextField } from "@mui/material";

const EditExamPage = () => {
  const [examsData, setExamsData] = useState(exams);

  const editExam = (examId, newTitle, newDescription) => {
    const updatedExams = examsData.map((exam) => {
      if (exam.id === examId) {
        return {
          ...exam,
          title: newTitle,
          description: newDescription,
        };
      }
      return exam;
    });

    setExams(updatedExams);
  };

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Retrieve the new title and description from the form fields
    const newTitle = event.target.elements.title.value;
    const newDescription = event.target.elements.description.value;
    // Use the editExam function to update the exams data
    editExam("4768ab12983c432e9842d25a", newTitle, newDescription);
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
  );
};

export default EditExamPage;
