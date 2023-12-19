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
} from "@mui/material";

import ReturnDashboard from "../components/ReturnDashboard.jsx";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import "../assets/styles/take-exam.css";
const QuestionChoice = ({ choice, index, selectedAnswer, onSelect }) => {
  const isSelected = selectedAnswer === index;
  const letter = String.fromCharCode(65 + index);

  return (
    <Box
      borderRadius={0}
      padding={1}
      backgroundColor={isSelected ? "primary.main" : "#E4E4E4"}
      marginBottom={1}
      boxShadow={2}
      color={isSelected ? "white" : "gray.700"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(index)}
      onClick={() => onSelect(index)}
    >
      <Typography className="letter-choice" color={isSelected ? "white" : "#8a8a8a"}>
        {letter}
      </Typography>
      <Typography variant="button" textTransform={"none"}>
        {choice}
      </Typography>
      {isSelected && <IconButton color={"#347634"} size="small">Selected</IconButton>}
    </Box>
  );
};

const TakeExamPage = () => {
  const { examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState({});

  const { questions, title } = selectedExam;
  const currentQuestion = questions[currentQuestionIndex];

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    // setCurrentQuestion(selectedExam.questions[currentQuestionIndex]);
  };
  const handleSubmitAnswer = () => {
    if (currentQuestionIndex < selectedExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // return score
    }
  };
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectChoice = (index) => {
    setSelectedAnswer(index);
  };

  return (
    <>
      <div className="take-exam-content--wrapper">
        <ReturnDashboard />
        <h2 style={{ marginTop: "1rem" }}> {title} </h2>
        <Card>
          <CardContent sx={{ p: "2rem" }}>
            <div className="question--header">
              Question # {currentQuestionIndex + 1}
              {console.log("Questions array length: ", questions.length)}
              {console.log("Current: ", currentQuestion)}
            </div>
            <span>{currentQuestion.question}</span>
            {currentQuestion.choices.map((choice, index) => (
              <QuestionChoice
                key={index}
                choice={choice}
                index={index}
                selectedAnswer={selectedAnswer}
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
                <Button disabled>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TakeExamPage;
