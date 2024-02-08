import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import QuestionChoice from "../components/ExamComponents/QuestionChoice.jsx";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import axios from "axios";
import CountdownTimer from "../components/CountDownTimer";
import "../assets/styles/take-exam.css";
const TakeExamPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [examData, setExamData] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasMovedForward, setHasMovedForward] = useState(false);
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

  useEffect(() => {
    if (shouldNavigate && score !== null) {
      navigate(`/dashboard/exams/${examId}/take-exam/result/${score}`);
    }
  }, [shouldNavigate, score, navigate, examId]);

  // Disable browser's back button
  useEffect(() => {
    const disableBackButton = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function (event) {
        window.history.pushState(null, "", window.location.href);
      };
    };

    disableBackButton();

    return () => {
      // Cleanup function to re-enable back button when leaving the component
      window.onpopstate = null;
    };
  }, []);
  const handleSelectChoice = (index) => {
    if (!answerConfirmed) {
      setChosenAnswers({ ...chosenAnswers, [currentQuestionIndex]: index });
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (!hasMovedForward) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAnswer = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < examData?.questions.length - 1) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setHasMovedForward(true);
      setAnswerConfirmed(false);
    } else {
      computeScore();
      setShouldNavigate(true);
    }
  };

  const handleConfirmAnswer = () => {
    storeUserAnswers();
    setShowAnswer(true);
    setAnswerConfirmed(true);
  };

  const storeUserAnswers = () => {
    if (chosenAnswers[currentQuestionIndex] !== undefined) {
      localStorage.setItem(
        `chosenAnswers_${examId}`,
        JSON.stringify(chosenAnswers)
      );
    }
  };

  const computeScore = () => {
    const totalQuestions = examData?.questions.length || 1;
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

  const displayAnswer = () => {
    const currentQuestion = examData?.questions[currentQuestionIndex];
    const userAnswerIndex = chosenAnswers[currentQuestionIndex];
    const isCorrect =
      userAnswerIndex !== undefined &&
      userAnswerIndex === currentQuestion.correctAnswer;

    if (
      showAnswer &&
      chosenAnswers[currentQuestionIndex] !== undefined &&
      chosenAnswers[currentQuestionIndex] !== null
    ) {
      return (
        <div
          style={{
            fontSize: "1.5rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          className={isCorrect ? "correct-answer" : "wrong-answer"}
        >
          {isCorrect ? "Correct!" : "Wrong! The correct answer is: "}
          {currentQuestion.choices[currentQuestion.correctAnswer]}
        </div>
      );
    }

    return null;
  };

  return (
    <Box
      className="take-exam-content--wrapper"
      boxShadow={2}
      sx={{ width: "700px" }}
    >
      <div className="exam-question--header">
        <h2 style={{ marginTop: "1rem" }}> {examData?.title} </h2>
        <span> Instructions: {examData?.instructions}</span>
      </div>
      <Card className="exam-card">
        <CardContent
          style={{
            fontSize: "1.5rem",
          }}
        >
          <div className="question--header">
            Question # {currentQuestionIndex + 1}
          </div>
          <span
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {examData?.questions[currentQuestionIndex]?.question}{" "}
          </span>
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
          {displayAnswer()}
          <div
            className="question--footnote"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.5rem",
            }}
          >
            {currentQuestionIndex > 0 ? (
              <Button
                className="brand-red-bg"
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  opacity: hasMovedForward ? 0.5 : 1,
                }}
                onClick={prevQuestion}
                disabled={hasMovedForward}
              >
                <SlArrowLeft size={"0.5rem"} /> &nbsp; Back
              </Button>
            ) : (
              <Button disabled>Back</Button>
            )}

            <Button
              variant="contained"
              style={{ textTransform: "capitalize" }}
              onClick={handleConfirmAnswer}
              disabled={answerConfirmed}
            >
              Confirm Answer
            </Button>

            {currentQuestionIndex < examData?.questions.length - 1 && (
              <Button
                className="brand-red-bg"
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  opacity: !answerConfirmed ? 0.5 : 1,
                }}
                onClick={handleSubmitAnswer}
                disabled={!answerConfirmed}
              >
                Next &nbsp; <SlArrowRight size={"0.5rem"} />
              </Button>
            )}

            {currentQuestionIndex === examData?.questions.length - 1 && (
              <Button
                className="brand-blue-bg"
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={handleSubmitAnswer}
                disabled={!answerConfirmed}
              >
                Submit
              </Button>
            )}
          </div>
        </CardContent>
        <div>
          <CountdownTimer initialTime={30} />
        </div>
      </Card>
    </Box>
  );
};

export default TakeExamPage;
