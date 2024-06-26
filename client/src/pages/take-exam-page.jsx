import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionChoice from "../components/ExamComponents/QuestionChoice.jsx";
import axios from "axios";
import { useCustomContext } from "../main.jsx";

const TakeExamPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerConfirmed, setAnswerConfirmed] = useState(false);
  const [feedback, setFeedback] = useState({ isCorrect: null, message: "" });
  const { setExamId } = useCustomContext();
  const [farthestQuestionReached, setFarthestQuestionReached] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/exam/${examId}/take-exam/${examId}`)
      .then((response) => {
        setExamData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
      });

    setExamId(examId);

    // Prevent back navigation
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [examId]);

  const handleBackNavigation = (event) => {
    event.preventDefault();
    setOpenDialog(true);
    window.history.pushState(null, document.title, window.location.href);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  if (!examData) return <div>Loading...</div>;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerConfirmed(false);

      setFarthestQuestionReached(
        Math.max(farthestQuestionReached, currentQuestionIndex + 1)
      );
    }
  };

  const handlePrevQuestion = () => {
    if (
      currentQuestionIndex > 0 &&
      currentQuestionIndex <= farthestQuestionReached
    ) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswerConfirmed(false);
    }
  };

  const handleAnswerSelect = (choiceIndex) => {
    if (answerConfirmed) {
      return;
    }
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setUserAnswers(newAnswers);
  };

  const handleConfirmAnswer = () => {
    const currentQuestion = examData.questions[currentQuestionIndex];
    const isCorrect =
      userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;
    const feedbackMessage = isCorrect
      ? "Correct answer!"
      : `Incorrect! The correct answer is: ${
          currentQuestion.choices[currentQuestion.correctAnswer].text
        }`;

    setFeedback({
      isCorrect,
      message: feedbackMessage,
    });
    setAnswerConfirmed(true);
  };

  const handleSubmitExam = () => {
    const correctAnswersCount = userAnswers.reduce((acc, userAnswer, index) => {
      const question = examData.questions[index];
      return acc + (userAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
    const score = (correctAnswersCount / examData.questions.length) * 100;
    navigate(`/dashboard/exams/${examId}/take-exam/result/${score.toFixed(2)}`);
  };

  const { title, instructions, questions } = examData;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box
      className="take-exam-content--wrapper"
      boxShadow={2}
      sx={{
        width: 900,
        height: "430px",
        margin: "auto",
        overflow: "auto",
        marginTop: "50px",
      }}
    >
      <div className="exam-question--header">
        <h3>{title}</h3>
        <span>Question: {instructions}</span>
      </div>
      <Card
        className="exam-card"
        style={{ height: "340px", padding: "1rem", margin: "1rem" }}
      >
        <CardContent>
          <Typography className="question--header" fontSize={"1.5rem"}>
            Question #{currentQuestionIndex + 1} {currentQuestion.question}
          </Typography>
          <div>
            {currentQuestion.choices.map((choice, index) => (
              <QuestionChoice
                key={choice._id}
                index={index}
                choiceText={choice.text}
                isSelected={userAnswers[currentQuestionIndex] === index}
                onSelect={() => handleAnswerSelect(index)}
              />
            ))}
            {answerConfirmed && (
              <Typography
                sx={{
                  color: feedback.isCorrect ? "green" : "black",
                  mt: 2,
                  fontWeight: "bold",
                }}
              >
                {feedback.message}
              </Typography>
            )}
          </div>
          <Box
            className="question--footnote"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              "& > button": {
                margin: "0 8px",
              },
              fontSize: "1.5rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={handlePrevQuestion}
              disabled={
                currentQuestionIndex === 0 ||
                currentQuestionIndex >= farthestQuestionReached
              }
              startIcon={<ArrowBackIosNewIcon />}
              sx={{ textTransform: "capitalize" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmAnswer}
              disabled={answerConfirmed}
              sx={{ textTransform: "capitalize" }}
            >
              Confirm Answer
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              endIcon={<ArrowForwardIosIcon />}
              disabled={
                currentQuestionIndex === questions.length - 1 ||
                !answerConfirmed
              }
              sx={{ textTransform: "capitalize" }}
            >
              Next
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitExam}
              disabled={currentQuestionIndex !== questions.length - 1}
              sx={{ textTransform: "capitalize" }}
            >
              Submit
            </Button>

            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You cannot go back during the exam. Please finish the exam.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TakeExamPage;
