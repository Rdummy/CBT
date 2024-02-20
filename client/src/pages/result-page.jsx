import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import "../assets/styles/ExamResultPage.css";

const ExamResultPage = () => {
  const { score, examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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

  const getResultLabel = () => (parseFloat(score) >= 80 ? "PASSED" : "FAIL");

  const handleRetakeExam = () => {
    // Include necessary state for ReviewExamPage, if any, similar to how it's received initially
    navigate(`/dashboard`);
  };

  const handleReturnDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="exam-result-container">
      <Card style={{ marginTop: "40px", width: "800px", height: "300px" }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            style={{ textAlign: "center", fontSize: "3.5rem" }}
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
            className={`result-label ${getResultLabel().toLowerCase()}`}
          >
            {getResultLabel()}
          </Typography>

          {getResultLabel() === "PASSED" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleReturnDashboard}
              style={{ marginTop: "20px" }}
            >
              Return to Dashboard
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRetakeExam}
              style={{ marginTop: "20px" }}
            >
              Retake Exam
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamResultPage;
