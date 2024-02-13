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
  const [storedAnswers, setStoredAnswers] = useState([]);

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
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

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

  const getResultLabel = () => {
    if (score !== null) {
      return parseFloat(score) >= 50 ? "PASSED" : "FAIL";
    } else {
      return "";
    }
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
      <div className="exam-result-content">
        <Card>
          {/* <ReturnDashboard /> */}
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                textAlign: "center",
                fontSize: "3.5rem",
              }}
            >
              Exam Result
            </Typography>

            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                fontSize: "3.5rem",
                fontWeight: "bold",
              }}
            >
              Your Score: {score !== undefined ? `${score}%` : "Calculating..."}
            </Typography>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "3.5rem",
                fontWeight: "bold",
              }}
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
                <div key={index}>{/* ... (existing code) */}</div>
              ))}
            </div>
            <div className="renderPagination-container">
              {renderPagination()}
            </div>
            <div className="pagination-container">
              {getResultLabel() === "FAIL" && (
                <Button
                  className="buttonRetake"
                  href="/dashboard/exams/659cc4846c0a7bfdfb291c7a/"
                  variant="contained"
                  color="primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    size: "large",
                  }}
                >
                  Retake Exam
                </Button>
              )}
            </div>
            <div className="results-container">
              {getKnowQuestions().length > 0 && (
                <div>
                  <Typography var iant="h5">
                    What You Know:
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
            <div className="pagination-container">
              {getResultLabel() === "PASSED" && (
                <Button
                  className="buttonReturnDashboard"
                  href="/dashboard"
                  variant="contained"
                  color="primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    size: "large",
                    marginTop: "20px", // Add margin to move the button to the bottom
                  }}
                >
                  Return Dashboard
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamResultPage;
