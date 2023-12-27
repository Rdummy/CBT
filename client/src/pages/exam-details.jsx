import { useNavigate, useParams } from "react-router-dom";
import exams from "../models/exam-data"; // Assuming you're importing your exam data from an external file
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import "../assets/styles/ExamRoutes.css";
import ReturnDashboard from "../components/ReturnDashboard";
import { useState } from "react";

function ExamDetailsPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Assuming exams is a state variable and setExams is a setter function for the state
  const [examList, setExamList] = useState(exams);
  const selectedExam = examList.find((exam) => exam.id === examId);

  const handleReviewClick = () => {
    navigate(`/dashboard/exams/${examId}/review`, {
      state: { examId: examId },
    });
  };

  const handleTakeExamClick = () => {
    navigate(`/dashboard/exams/${examId}/take-exam`, {
      state: { examId: examId },
    });
  };

  const handleDeleteExam = () => {
    const updatedExams = examList.filter((exam) => exam.id !== examId);
    setExamList(updatedExams);
    navigate("/dashboard");
    // You might add a confirmation message or notification for successful deletion
  };

  const handleEditExam = () => {
    navigate(`/dashboard/exams/${examId}/edit`);
    // You might also pass the selectedExam data to the edit page if needed
    // navigate(`/dashboard/exams/${examId}/edit`, { state: { selectedExam } });
  };

  if (!selectedExam) {
    return <p>Exam not found</p>;
  }

  return (
    <>
      <div className="exam-details--wrapper">
        <Card sx={{ m: 5 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                opacity: 0.7,
              }}
            >
              <ReturnDashboard />
              <Box>
                <Button
                  variant="contained"
                  className="brand-red-bg"
                  sx={{ textTransform: "capitalize", mr: 2 }}
                  onClick={handleDeleteExam}
                >
                  Delete Exam
                </Button>
                <Button
                  variant="contained"
                  className="brand-red-bg"
                  sx={{ textTransform: "capitalize" }}
                  onClick={handleEditExam}
                >
                  Edit Exam
                </Button>
              </Box>
            </Box>

            <Typography variant="h5" sx={{ mt: 2 }}>
              {selectedExam.title}
            </Typography>

            <Typography variant="body1" sx={{ my: 3 }}>
              {selectedExam.description}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Status */}
              <Typography variant="body2">
                Status: {selectedExam.status}
              </Typography>
              {/* Created Date */}
              <Typography variant="body2">
                Created: {selectedExam.createdAt}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
              <Button
                className="brand-red-bg"
                sx={{ textTransform: "capitalize", px: 3, py: 2, mx: 0.5 }}
                onClick={handleReviewClick}
              >
                {" "}
                Start Reviewing
              </Button>
              <Button
                className="brand-red-bg"
                sx={{ textTransform: "capitalize", px: 3, py: 2, mx: 0.5 }}
                onClick={handleTakeExamClick}
              >
                {" "}
                Take Exam
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ExamDetailsPage;
