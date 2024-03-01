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
  const [selectedDepartment, setSelectedDepartment] = useState(""); // Initialize the state
  const [numberOfParticipants, setNumberOfParticipants] = useState(""); // New state for number of participants

  useEffect(() => {
    getExams().then((response) => {});
  }, []);

  const getExams = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/exam/content/exam-title`
      );
      if (response.data !== undefined) {
        setExams(response.data);
        setExamList(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(
        "Error getting exams:",
        error.response ? error.response.data.error : error.message
      );
    }
  };
  const handleAssignExam = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/content/assign-exam/${examId}`,
        {
          assignedDepartment: selectedDepartment,
          numberOfParticipants: numberOfParticipants, // Include this in the POST request
        }
      );

      console.log(response.data.message);
      handleCloseModal();
      navigate(`/dashboard/create-content/${examId}`); // Update the route accordingly
    } catch (error) {
      console.error(
        "Error assigning exam:",
        error.response ? error.response.data.error : error.message
      );
    }
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

  const handleDeleteExam = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/exam/delete-exam/${examId}`
      );
      console.log(response.data); // Log or handle response data as needed
      // After successful deletion, update the UI or redirect as needed
      navigate("/dashboard/create-content");
    } catch (error) {
      console.error(
        "Error deleting exam:",
        error.response ? error.response.data.error : error.message
      );
    }
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
        <Card sx={{ m: 3, height: "80vh" }}>
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
                {/* <Button
                  variant="contained"
                  className="exam-details--button"
                  sx={{ textTransform: "capitalize", borderRadius: "0rem" }}
                  onClick={handleEditExam}
                >
                  <FaEdit /> &nbsp; Edit
                </Button> */}
              </div>
            </Box>

            <Typography variant="h5" sx={{ mt: 2 }}>
              {selectedExam.title}
            </Typography>

            <Typography variant="body1" sx={{ my: 3 }}>
              {selectedExam.description}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* <Typography variant="body2">
                Status: {selectedExam.status}
              </Typography> */}

              {/* <Typography variant="body2">
                Created: {selectedExam.createdAt}
              </Typography> */}
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

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          sx={{ width: "auto", maxWidth: "none" }}
        >
          <form onSubmit={handleAssignExam}>
            <DialogTitle>Assign Department</DialogTitle>
            <DialogContent>
              <Select
                label="Department"
                placeholder="Select Department"
                name="department"
                value={selectedDepartment} // Add this line to set the selected value
                onChange={(e) => setSelectedDepartment(e.target.value)} // Add this line to handle selection changes
                fullWidth
                margin="dense"
                sx={{ width: "300px" }}
              >
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </DialogContent>
            <DialogContent>
              <TextField
                label="Number of Participants"
                name="numberOfParticipants"
                type="number"
                value={numberOfParticipants}
                onChange={(e) => setNumberOfParticipants(e.target.value)}
                fullWidth
                margin="dense"
                sx={{ width: "300px" }}
              />
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
