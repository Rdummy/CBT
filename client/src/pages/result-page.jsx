import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Toolbar,
  Button,
} from "@mui/material";
import ReturnDashboard from "../components/ReturnDashboard.jsx";
import exams from "../models/exam-data";
import "../assets/styles/ExamResultPage.css";

const itemsPerPage = 1;

const ExamResultPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const { score, examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);
  const { questions } = selectedExam;

  const storedAnswers = JSON.parse(
    localStorage.getItem(`chosenAnswers_${examId}`)
  );

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentQuestions = questions.slice(offset, offset + itemsPerPage);

  const getResultLabel = () => {
    if (score !== null) {
      return parseFloat(score) >= 50 ? "PASSED" : "FAIL";
    } else {
      return "";
    }
  };

  const getIconForAnswer = (isCorrect, isKnowSection) => {
    const icon = isCorrect ? "✓" : "✗";
    const className = isCorrect ? "check-mark" : "cross-mark";
    return <span className={className}>{icon}</span>;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }
    return (
      <div className="pagination">
        {renderPreviousButton()}
        {pages}
        {renderNextButton()}
      </div>
    );
  };

  const renderPreviousButton = () => (
    <button
      className="previous"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 0}
    >
      Previous
    </button>
  );

  const renderNextButton = () => (
    <button
      className="next"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
    >
      Next
    </button>
  );

  const getReviewQuestions = () => {
    const reviewQuestions = [];
    currentQuestions.forEach((question, index) => {
      const globalIndex = offset + index;
      if (
        storedAnswers &&
        storedAnswers[globalIndex] !== undefined &&
        question.choices &&
        storedAnswers[globalIndex] !== question.correctAnswer
      ) {
        reviewQuestions.push({
          index: globalIndex + 1,
          question: question.question,
          yourAnswer:
            storedAnswers[globalIndex] !== undefined
              ? question.choices[storedAnswers[globalIndex]]
              : "Not answered",
          correctAnswer: question.choices[question.correctAnswer],
          explanation: question.explanation,
          knowledge: question.knowledge, // added knowledge property
        });
      }
    });
    return reviewQuestions;
  };

  const getKnowQuestions = () => {
    const knowQuestions = [];
    currentQuestions.forEach((question, index) => {
      const globalIndex = offset + index;
      if (
        storedAnswers &&
        storedAnswers[globalIndex] !== undefined &&
        question.choices &&
        storedAnswers[globalIndex] === question.correctAnswer
      ) {
        knowQuestions.push({
          index: globalIndex + 1,
          question: question.question,
          yourAnswer:
            storedAnswers[globalIndex] !== undefined
              ? question.choices[storedAnswers[globalIndex]]
              : "Not answered",
          correctAnswer: question.choices[question.correctAnswer],
          explanation: question.explanation,
          knowledge: question.knowledge, // added knowledge property
        });
      }
    });
    return knowQuestions;
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
        <Card sx={{ width: "100%", maxWidth: 900, marginTop: "2rem" }}>
          <ReturnDashboard />
          <CardContent sx={{ p: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              Exam Result
            </Typography>

            <Typography variant="h6">
              Your Score: {score !== undefined ? `${score}%` : "Calculating..."}
            </Typography>

            <div className={`results-container ${showResults ? "show" : ""}`}>
              <Typography variant="h5">Questions:</Typography>
              {currentQuestions.map((question, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">
                    Question {offset + index + 1}: {question.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color:
                        storedAnswers &&
                        storedAnswers[offset + index] !== undefined &&
                        question.choices
                          ? storedAnswers[offset + index] ===
                            question.correctAnswer
                            ? "green"
                            : "red"
                          : "black",
                    }}
                  >
                    Your Answer:{" "}
                    {storedAnswers &&
                    storedAnswers[offset + index] !== undefined &&
                    question.choices
                      ? question.choices[storedAnswers[offset + index]]
                      : "Not answered"}
                    {getIconForAnswer(
                      storedAnswers &&
                        storedAnswers[offset + index] !== undefined
                        ? storedAnswers[offset + index] ===
                            question.correctAnswer
                        : false
                    )}
                  </Typography>
                  <Typography variant="body1">
                    Correct Answer: {question.choices[question.correctAnswer]}
                  </Typography>
                  <Typography variant="body1">
                    Explanation: {question.explanation}
                  </Typography>
                  <Typography variant="body1">
                    Knowledge: {question.knowledge}
                  </Typography>
                  <br />
                </div>
              ))}
            </div>
            <div
              className={`renderPagination-container ${
                showResults ? "show" : ""
              }`}
            >
              {showResults && renderPagination()}
            </div>
            <div className="pagination-container">
              <Button
                variant="contained"
                color="primary"
                onClick={toggleResults}
              >
                {showResults ? "Hide Results" : "View Results"}
              </Button>
            </div>
            <div className={`results-container ${showResults ? "show" : ""}`}>
              {showResults && getKnowQuestions().length > 0 && (
                <div>
                  <Typography variant="h5">
                    {getIconForAnswer(true)}What You Know:
                  </Typography>
                  {getKnowQuestions().map((question) => (
                    <div key={question.index}>
                      <Typography variant="subtitle1">
                        Question {question.index}: {question.question}
                      </Typography>
                      <Typography variant="body1">
                        You Know About: {question.knowledge}
                      </Typography>
                      <br />
                    </div>
                  ))}
                </div>
              )}
              {showResults && getReviewQuestions().length > 0 && (
                <div>
                  <Typography variant="h5">
                    {getIconForAnswer(false)} What You Should Review:
                  </Typography>
                  {getReviewQuestions().map((question) => (
                    <div key={question.index}>
                      <Typography variant="subtitle1">
                        Question {question.index}: {question.question}
                      </Typography>
                      <Typography variant="body1">
                        Review About: {question.knowledge}
                      </Typography>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default ExamResultPage;
