import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Toolbar, Button } from "@mui/material";
import axios from "axios";
import ReturnDashboard from "../components/ReturnDashboard.jsx";
import "../assets/styles/ExamResultPage.css";

const itemsPerPage = 1;

const ExamResultPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [storedAnswers, setStoredAnswers] = useState([]); // Add this line

  const { score, examId } = useParams();

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentQuestions = questions.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/result/${examId}/questions`
        );
        setQuestions(response.data.questions); // Set questions state
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

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
          knowledge: question.knowledge,
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
          knowledge: question.knowledge,
        });
      }
    });
    return knowQuestions;
  };

  return (
    <div className="exam-result-container">
      <Toolbar
        className="exams-category--header"
        sx={{ justifyContent: "space-between" }}
      ></Toolbar>
      <div className="exam-result-content">
        <Card>
          <ReturnDashboard />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Exam Result
            </Typography>

            <Typography variant="h6">
              Your Score: {score !== undefined ? `${score}%` : "Calculating..."}
            </Typography>
            <Typography
              variant="h6"
              className={`result-label ${
                score !== undefined
                  ? parseFloat(score) >= 50
                    ? "passed"
                    : "failed"
                  : ""
              }`}
            >
              {getResultLabel()}
            </Typography>

            <div className="results-container">
              <Typography variant="h5">Questions:</Typography>
              {currentQuestions.map((question, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">
                    Question {offset + index + 1}: {question.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={`your-answer ${
                      storedAnswers &&
                      storedAnswers[offset + index] !== undefined &&
                      question.choices
                        ? storedAnswers[offset + index] ===
                          question.correctAnswer
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
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
                  <br />
                </div>
              ))}
            </div>
            <div className="renderPagination-container">
              {renderPagination()}
            </div>
            <div className="pagination-container">
              <Button variant="contained" color="primary">
                View Results
              </Button>
            </div>
            <div className="results-container">
              {getKnowQuestions().length > 0 && (
                <div>
                  <Typography variant="h5">What You Know:</Typography>
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
              {getReviewQuestions().length > 0 && (
                <div>
                  <Typography variant="h5">What You Should Review:</Typography>
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
      </div>
    </div>
  );
};

export default ExamResultPage;
