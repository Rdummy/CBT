import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Toolbar,
  Box,
} from "@mui/material";
import ReturnDashboard from "../components/ReturnDashboard.jsx";
import exams from "../models/exam-data";
import { MdCheck, MdClear } from "react-icons/md"; // Import icons

const ExamResultPage = () => {
  const { score, examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);
  const { questions } = selectedExam;

  // Retrieve chosen answers from localStorage
  const storedAnswers = JSON.parse(
    localStorage.getItem(`chosenAnswers_${examId}`)
  );

  const getIconForAnswer = (isCorrect) => {
    return isCorrect ? (
      <MdCheck style={{ color: "green" }} />
    ) : (
      <MdClear style={{ color: "red" }} />
    );
  };

  const getResultLabel = () => {
    const numericScore = parseFloat(score);
    return numericScore >= 50 ? "PASSED" : "FAIL";
  };

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
            <Typography
              variant="h6"
              style={{
                color:
                  score !== undefined
                    ? parseFloat(score) >= 50
                      ? "green"
                      : "red"
                    : "black",
              }}
            >
              {getResultLabel()}
            </Typography>
            <div>
              <Typography variant="h5" gutterBottom>
                Correct and Incorrect Answers:
              </Typography>
              {questions.map((question, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">
                    Question {index + 1}: {question.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color:
                        storedAnswers &&
                        storedAnswers[index] !== undefined &&
                        question.choices
                          ? storedAnswers[index] === question.correctAnswer
                            ? "green"
                            : "red"
                          : "black",
                    }}
                  >
                    Your Answer:{" "}
                    {storedAnswers &&
                    storedAnswers[index] !== undefined &&
                    question.choices
                      ? question.choices[storedAnswers[index]]
                      : "Not answered"}
                    {getIconForAnswer(
                      storedAnswers && storedAnswers[index] !== undefined
                        ? storedAnswers[index] === question.correctAnswer
                        : false
                    )}
                  </Typography>
                  <Typography variant="body1">
                    Correct Answer: {question.choices[question.correctAnswer]}
                  </Typography>
                  <br />
                </div>
              ))}
            </div>
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                What you know {getIconForAnswer(true)}:
              </Typography>
              {questions.map((question, index) => (
                <div key={index}>
                  {storedAnswers &&
                    storedAnswers[index] === question.correctAnswer && (
                      <Typography variant="body1">
                        Question {index + 1}: {question.question}
                      </Typography>
                    )}
                </div>
              ))}
            </Box>
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                What you should Review {getIconForAnswer(false)}:
              </Typography>
              {questions.map((question, index) => (
                <div key={index}>
                  {storedAnswers &&
                    storedAnswers[index] !== undefined &&
                    storedAnswers[index] !== question.correctAnswer && (
                      <Typography variant="body1">
                        Question {index + 1}: {question.question}
                      </Typography>
                    )}
                </div>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default ExamResultPage;
