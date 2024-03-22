import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Toolbar,
  Typography,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import ExamCard from "../components/ExamCard";
import "../assets/styles/dashboard.css";

function ExamPage() {
  const [page, setPage] = useState(1);
  const examsPerPage = 4;
  const [openModal, setOpenModal] = useState(false);
  const [exams, setExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    _id: "",
  });

  useEffect(() => {
    getExams().then((data) => {
      if (data) {
        setExams(data.availableExams);
        setCompletedExams(data.passedExams); // Update this line
      }
    });
  }, []);

  const displayedExams = exams.slice(
    (page - 1) * examsPerPage,
    page * examsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getExams = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "No token found. User must be logged in to view exams."
        );
      }

      const response = await axios.get(
        "http://localhost:3001/exam/exam-title",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setOpenModal(false);

    try {
      const response = await axios.post(
        "http://localhost:3001/exam/exam-title",
        {
          title: formData.title,
          description: formData.description,
          id: uuidv4(),
        }
      );

      if (response.statusText === "Created") {
        console.log("Exam added successfully");
      }

      const newExam = response.data;

      setExams((prevExams) => [
        ...prevExams,
        {
          id: newExam.id,
          title: newExam.title,
          description: newExam.description,
        },
      ]);

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding new exam:", error);
    }
  };

  return (
    <Container maxWidth="xxl">
      <Toolbar
        className="exams-category--header"
        sx={{ justifyContent: "center" }}
      >
        <Typography className="exams-category--header--text">
          Examinations
        </Typography>
      </Toolbar>
      {exams.length === 0 && (
        <Typography variant="h6" align="center" style={{ marginTop: 20 }}>
          No Exams Available
        </Typography>
      )}

      <Grid
        container
        spacing={1} // Adjust spacing as needed for design
        alignItems="center"
        justifyContent="center"
      >
        {displayedExams.map((exam, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${exam.id}-${index}`}>
            <div className="grid-item--wrapper">
              <ExamCard
                key={`${exam.id}-${index}`}
                exam={exam}
                updatedAt={exam.updatedAt}
                style={{ minHeight: "300px" }}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <TableContainer
        component={Paper}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#e71e4a" }}>
              <TableCell style={{ color: "white" }}>Exam Title</TableCell>
              <TableCell style={{ color: "white" }}>Deparment</TableCell>
              <TableCell style={{ color: "white" }}>Score</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedExams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.assignedDepartment}</TableCell>
                <TableCell>{exam.score}</TableCell>
                <TableCell>{exam.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ExamPage;
