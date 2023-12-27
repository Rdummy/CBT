import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import exams from "../models/exam-data";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import QuestionChoice from "../components/ExamComponents/QuestionChoice.jsx"
import ReturnDashboard from "../components/ReturnDashboard.jsx";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "../components/ExamComponents/QuestionChoice.jsx"
import "../assets/styles/take-exam.css";


const TakeExamPage = () => {
  const { examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(null);

  const { questions, title, instructions } = selectedExam;
  const currentQuestion = questions[currentQuestionIndex];

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    // setCurrentQuestion(selectedExam.questions[currentQuestionIndex]);
  };
  const handleSubmitAnswer = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < selectedExam.questions.length - 1) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(chosenAnswers[nextQuestionIndex]);
    } else {
      computeScore();
    }
  };

  const handleSelectChoice = (index) => {
    setChosenAnswers({ ...chosenAnswers, [currentQuestionIndex]: index });
  };

  const computeScore = () => {
    const totalQuestions = selectedExam.questions.length;
    const correctAnswers = selectedExam.questions.reduce(
      (count, question, index) => {
        const correctAnswer = question.correctAnswer;
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
        <h2 style={{ marginTop: "1rem" }}> {title} </h2>
        <span> Instructions: {instructions}</span>
      </div>
      <Card className="exam-card">
        <CardContent >
          <div className="question--header">
            Question # {currentQuestionIndex + 1}
            <div className="question--score">
              {score !== null && (
                <div>
                  <Typography variant="h6">Your Score: {score} % </Typography>
                </div>
              )}
            </div>
          </div>
          <span>{currentQuestion.question}</span>
          {currentQuestion.choices.map((choice, index) => (
            <QuestionChoice
              key={index}
              choice={choice}
              index={index}
              selectedAnswer={chosenAnswers[currentQuestionIndex]}
              onSelect={handleSelectChoice}
            />
          ))}

          {/* Question Foot Note */}
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
            {currentQuestionIndex < selectedExam.questions.length - 1 ? (
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
