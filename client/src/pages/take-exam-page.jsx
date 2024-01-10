import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import QuestionChoice from "../components/ExamComponents/QuestionChoice.jsx";
import ReturnDashboard from "../components/ReturnDashboard.jsx";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import axios from "axios"; // Import Axios

const TakeExamPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [examData, setExamData] = useState(null); // State to store fetched exam data

  useEffect(() => {
    // Fetch exam data using Axios when component mounts
    axios
      .get("http://localhost:3001/exam/:examId/take-exam/:examId")
      .then((response) => {
        setExamData(response.data); // Assuming the response contains exam data
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
        // Handle error or set default exam data
      });
  }, [examId]);

  useEffect(() => {
    if (shouldNavigate && score !== null) {
      navigate(`/dashboard/exams/${examId}/take-exam/result/${score}`);
    }
  }, [shouldNavigate, score, navigate, examId]);

  const handleSelectChoice = (index) => {
    setChosenAnswers({ ...chosenAnswers, [currentQuestionIndex]: index });
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmitAnswer = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < examData?.questions.length - 1) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      computeScore();
      storeUserAnswers();
      setShouldNavigate(true);
    }
  };

  const storeUserAnswers = () => {
    localStorage.setItem(
      `chosenAnswers_${examId}`,
      JSON.stringify(chosenAnswers)
    );
  };

  const computeScore = () => {
    const totalQuestions = examData?.questions.length || 1; // Prevent division by zero
    const correctAnswers = Object.keys(chosenAnswers).reduce(
      (count, questionIndex) => {
        const index = parseInt(questionIndex);
        const correctAnswer = examData?.questions[index].correctAnswer;
        const userAnswer = chosenAnswers[index];
        return userAnswer !== undefined && userAnswer === correctAnswer
          ? count + 1
          : count;
      },
      0
    );

    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore.toFixed(2));
  };

  return (
    <Box className="take-exam-content--wrapper" boxShadow={2}>
      <div className="exam-question--header">
        <ReturnDashboard />
        <h2 style={{ marginTop: "1rem" }}> {examData?.title} </h2>
        <span> Instructions: {examData?.instructions}</span>
      </div>
      <Card className="exam-card">
        <CardContent>
          <div className="question--header">
            Question # {currentQuestionIndex + 1}
            {/* Show score here */}
          </div>
          <span>{examData?.questions[currentQuestionIndex]?.question}</span>
          {examData?.questions[currentQuestionIndex]?.choices.map(
            (choice, index) => (
              <QuestionChoice
                key={index}
                choice={choice}
                index={index}
                selectedAnswer={chosenAnswers[currentQuestionIndex]}
                onSelect={handleSelectChoice}
              />
            )
          )}
          <div className="question--footnote">
            {currentQuestionIndex > 0 ? (
              <Button
                className="brand-red-bg"
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={prevQuestion}
              >
                <SlArrowLeft size={"0.5rem"} /> &nbsp; Back
              </Button>
            ) : (
              <Button disabled>Back</Button>
            )}
            {currentQuestionIndex < examData?.questions.length - 1 ? (
              <Button
                className="brand-red-bg"
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={handleSubmitAnswer}
              >
                Next &nbsp; <SlArrowRight size={"0.5rem"} />
              </Button>
            ) : (
              <Button
                className="brand-blue-bg"
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={handleSubmitAnswer}
              >
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TakeExamPage;
