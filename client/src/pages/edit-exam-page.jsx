import React, { useState } from "react";
import exams from "../models/exam-data";

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
    <div>
      <h1>Edit Exam</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditExamPage;
