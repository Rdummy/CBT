import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionChoice from "../components/ExamComponents/QuestionChoice.jsx";
import axios from "axios";

const TakeExamPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerConfirmed, setAnswerConfirmed] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/exam/${examId}/take-exam/${examId}`)
      .then((response) => {
        setExamData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
      });
  }, [examId]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerConfirmed(false); // Reset confirmation on navigating to next question
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswerConfirmed(false); // Reset confirmation on navigating to previous question
    }
  };

  const handleAnswerSelect = (choiceIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = choiceIndex;
    setUserAnswers(newAnswers);
    setAnswerConfirmed(false); // User might change their mind before confirming
  };

  const handleConfirmAnswer = () => {
    setAnswerConfirmed(true);
  };

  const handleSubmitExam = () => {
    // Assuming each question is worth the same and score is out of 100
    const correctAnswersCount = userAnswers.reduce((acc, userAnswer, index) => {
      const question = examData.questions[index];
      return acc + (userAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
    const score = (correctAnswersCount / examData.questions.length) * 100;

    navigate(`/dashboard/exams/${examId}/take-exam/result/${score.toFixed(2)}`);
  };

  if (!examData) return <div>Loading...</div>;

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
        <span>Instructions: {instructions}</span>
      </div>
      <Card
        className="exam-card"
        style={{ height: "340px", padding: "1rem", margin: "1rem" }}
      >
        <CardContent>
          <Typography className="question--header">
            Question #{currentQuestionIndex + 1}
          </Typography>
          <div>
            {currentQuestion.choices.map((choice, index) => (
              <QuestionChoice
                key={choice._id} // using the unique MongoDB _id field for the key
                index={index}
                choiceText={choice.text} // passing only the text to be rendered
                isSelected={userAnswers[currentQuestionIndex] === index}
                onSelect={() => handleAnswerSelect(index)}
              />
            ))}
          </div>
          <Box
            className="question--footnote"
            sx={{
              display: "flex",
              justifyContent: "space-between", // This ensures that the space between all items is equal
              "& > button": {
                // This applies the styling to all direct button children
                margin: "0 8px", // Adjusts spacing around each button equally
              },
              fontSize: "1.5rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TakeExamPage;
