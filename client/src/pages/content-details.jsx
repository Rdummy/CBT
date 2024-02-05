import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import "../assets/styles/ExamRoutes.css";
import ReturnDashboard from "../components/ReturnDashboard";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

function ContentDetailsPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [exams, setExams] = useState([]);
  const [examList, setExamList] = useState(exams);

  useEffect(() => {
    getExams().then((response) => {});
  }, []);

  const getExams = async () => {
    axios.get("http://localhost:3001/exam/exam-title").then((response) => {
      if (response.data !== undefined) {
        setExams(response.data);
        setExamList(response.data);
      }
    });
  };

  const selectedExam = examList.find((exam) => exam._id === examId);

  const handleReviewClick = () => {
    navigate(`/dashboard/exams/${examId}/review`, {
      state: { details: selectedExam },
    });
  };
  const handleCreateAssignClick = () => {
    setOpenModal(true);
  };

  const handleTakeExamClick = () => {
    navigate(`/dashboard/create-content/${examId}/create-exam`, {
      state: { examId: examId },
    });
  };

  const handleDeleteExam = () => {
    ``;
    const updatedExams = examList.filter((exams) => exams._id !== examId);
    setExamList(updatedExams);
    navigate("/dashboard");
    // You might add a confirmation message or notification for successful deletion
  };

  const handleEditExam = () => {
    navigate(`/dashboard/exams/${examId}/edit`);
    // You might also pass the selectedExam data to the edit page if needed
    // navigate(`/dashboard/exams/${examId}/edit`, { state: { selectedExam } });
  };
  const handleCreateContentClick = () => {
    navigate(`/dashboard/create-content/${examId}/create-review`, {
      state: { examId: examId },
    });
  };

  if (!selectedExam) {
    return (
      <p>
        Loading exam {examId} and {exams._id}
      </p>
    );
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="exam-details--wrapper">
        <Card sx={{ m: 5, height: "80vh" }}>
          <CardContent>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <ReturnDashboard />
              <div>
                <Button
                  variant="contained"
                  className="exam-details--button"
                  sx={{
                    textTransform: "capitalize",
                    mr: 2,
                    borderRadius: "0rem",
                  }}
                  onClick={handleDeleteExam}
                >
                  <RiDeleteBin6Line /> &nbsp; Delete
                </Button>
                <Button
                  variant="contained"
                  className="exam-details--button"
                  sx={{ textTransform: "capitalize", borderRadius: "0rem" }}
                  onClick={handleEditExam}
                >
                  <FaEdit /> &nbsp; Edit
                </Button>
              </div>
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
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 2,
                margin: 7,
              }}
            >
              <Button
                className="brand-red-bg "
                sx={{
                  textTransform: "capitalize",
                  px: 3,
                  py: 2,
                  mx: 5,
                }}
                style={{
                  fontSize: "20px",
                  maxWidth: "200px",
                  maxHeight: "100px",
                  minWidth: "200px",
                  minHeight: "100px",
                }}
                onClick={handleCreateContentClick}
              >
                {" "}
                Create Review
              </Button>
              <Button
                className="brand-red-bg"
                sx={{ textTransform: "capitalize", px: 3, py: 2, mx: 5 }}
                onClick={handleTakeExamClick}
                style={{
                  fontSize: "20px",
                  maxWidth: "200px",
                  maxHeight: "100px",
                  minWidth: "200px",
                  minHeight: "100px",
                }}
              >
                {" "}
                Create Exam
              </Button>
              <Button
                className="brand-red-bg"
                sx={{ textTransform: "capitalize", px: 3, py: 2, mx: 5 }}
                onClick={handleCreateAssignClick}
                style={{
                  fontSize: "20px",
                  maxWidth: "200px",
                  maxHeight: "100px",
                  minWidth: "200px",
                  minHeight: "100px",
                }}
              >
                {" "}
                Assign Exam
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <form>
            <DialogTitle>Assign Department</DialogTitle>
            <DialogContent>
              <Select
                label="Department"
                placeholder="Select Department"
                name="department"
                fullWidth
                margin="normal"
                sx={{ width: "300px" }}
              >
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default ContentDetailsPage;
