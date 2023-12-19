import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import UI components
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Radio,
} from "@mui/material";
import exams from "../models/exam-data";
import QuestionCard from "../components/Exam Components/QuestionCard";
import ChoiceButton from "../components/Exam Components/ChoiceButton";
import OpenEndedTextField from "../components/Exam Components/OpenEnded";
import TrueFalseButtons from "../components/Exam Components/TrueFalseQuestion";
function TakeExamPage() {
  const { examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);

  // Store chosen answers in an array
  const [chosenAnswers, setChosenAnswers] = useState([]);

  useEffect(() => {
    // Initialize chosenAnswers with empty values
    setChosenAnswers(new Array(selectedExam.questions.length).fill(""));
  }, [selectedExam]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelection = (answer, questionIndex) => {
    const updatedAnswers = [...chosenAnswers];
    updatedAnswers[questionIndex] = answer;
    setChosenAnswers(updatedAnswers);
  };

  const handleSubmitAnswer = () => {
    if (currentQuestionIndex === selectedExam.questions.length - 1) {
      // Calculate score and navigate to review
      const score = calculateScore(chosenAnswers, selectedExam.questions);
      navigateToReview(selectedExam, chosenAnswers, score);
    } else {
      // Go to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateScore = (chosenAnswers, questions) => {
    // Implement your logic for calculating score based on chosen and correct answers
    // ... your scoring logic here ...
  };

  const navigateToReview = (exam, chosenAnswers, score) => {
    // Implement navigation to the review page with necessary data (exam, answers, score)
    // ... your navigation logic here ...
  };

  if (!selectedExam) {
    return <p>Exam not found</p>;
  }

  const { questions, title } = selectedExam;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Take Exam: {title}</h1>
      <Card>
        <CardContent>
          <QuestionCard question={currentQuestion} />
          {renderAnswerOptions()}
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleSubmitAnswer}>
              {currentQuestionIndex === selectedExam.questions.length - 1
                ? "Submit Exam"
                : "Next Question"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );

  function renderAnswerOptions() {
    switch (currentQuestion.type) {
      case "multipleChoice":
        return currentQuestion.choices.map((choice, index) => (
          <ChoiceButton
            key={choice}
            choice={choice}
            onAnswerSelect={(answer) => handleAnswerSelection(answer, currentQuestionIndex)}
            isSelected={chosenAnswers[currentQuestionIndex] === choice}
          />
        ));
      case "openEnded":
        return (
          <OpenEndedTextField
            value={chosenAnswers[currentQuestionIndex]}
            onChange={(event) =>
              handleAnswerSelection(event.target.value, currentQuestionIndex)
            }
          />
        );
      case "trueFalse":
        return (
          <TrueFalseButtons
            onAnswerSelect={handleAnswerSelection}
            selectedAnswer={chosenAnswers[currentQuestionIndex]}
          />
        );
      default:
        return "";
    }
  }
}

export default TakeExamPage;