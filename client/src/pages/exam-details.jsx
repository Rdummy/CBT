import { useNavigate, useParams } from "react-router-dom";
import exams from "../models/exam-data";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";

function ExamDetailsPage() {
  const { examId } = useParams();
  const selectedExam = exams.find((exam) => exam.id === examId);
  const navigate = useNavigate();

  if (!selectedExam) {
    return <p>Exam not found</p>;
  }

  return (
    <>
      <Navbar />
      <div className="exam-details--wrapper">
        <Card sx={{ m: 5, p: 5 }}>
          <CardContent>
          <Box sx={{ mb:4, opacity:0.7,  }}>
            <Button
              variant="contained"
              onClick={() => navigate("/dashboard")}
              sx={{ textTransform: "capitalize", px: 2, py: 0.5,borderRadius:"0px" }}
              >
              Return to Dashboard
            </Button>
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
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}
            >
              <Button
                className="brand-red-bg"
                sx={{ textTransform: "capitalize", px: 3, py: 2 }}
              >
                {" "}
                Start Reviewing
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ExamDetailsPage;
