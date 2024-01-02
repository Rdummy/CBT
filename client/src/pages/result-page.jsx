import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Toolbar,
} from "@mui/material";
import ReturnDashboard from "../components/ReturnDashboard.jsx";
import exams from "../models/exam-data"; // Importing exam data

const ExamResultPage = () => {
  const { score, examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);
  const { questions } = selectedExam;

  // Retrieve chosen answers from local storage (assuming it's stored during the exam)
  const storedAnswers = JSON.parse(
    localStorage.getItem(`chosenAnswers_${examId}`)
  );

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar
        className="exams-category--header"
        sx={{ justifyContent: "space-between" }}
      ></Toolbar>
      <Container
        maxWidth="xxl"
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 500 }}>
          <ReturnDashboard />
          <CardContent sx={{ p: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              Exam Result
            </Typography>
            <Typography variant="h6">
              Your Score: {score !== undefined ? `${score}%` : "Calculating..."}
            </Typography>

            {/* Displaying answers */}
            <div>
              <Typography variant="h5" gutterBottom>
                Correct and Incorrect Answers:
              </Typography>
              {questions.map((question, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">
                    Question {index + 1}: {question.question}
                  </Typography>
                  <Typography variant="body1">
                    Your Answer:{" "}
                    {storedAnswers[index] !== undefined
                      ? question.choices[storedAnswers[index]]
                      : "Not answered"}
                  </Typography>
                  <Typography variant="body1">
                    Correct Answer: {question.choices[question.correctAnswer]}
                  </Typography>
                  <br />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default ExamResultPage;
