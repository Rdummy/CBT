import React, { useState } from "react";
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
  Checkbox,
} from "@mui/material";

// Import ExamCard and any other necessary components or data
import exams from "../models/exam-data";
import ExamCard from "../components/ExamCard";
import "../assets/styles/dashboard.css";

function ExamPage() {
  const [page, setPage] = useState(1);
  const examsPerPage = 4;
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Array to keep track of selected exams
  const [selectedExams, setSelectedExams] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setOpenModal(false);
    exams.push({
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
    });
    setFormData({
      title: "",
      description: "",
    });
  };

  const handleDeleteExams = () => {
    exams.splice(
      exams.findIndex((exam) => selectedExams.includes(exam.id)),
      selectedExams.length
    );
    setSelectedExams([]);
    setPage(1);
  };

  const toggleCheckbox = (examId) => {
    if (selectedExams.includes(examId)) {
      setSelectedExams(selectedExams.filter((id) => id !== examId));
    } else {
      setSelectedExams([...selectedExams, examId]);
    }
  };

  const handleOpenDeleteConfirmation = () => {
    if (selectedExams.length > 0) {
      setDeleteConfirmationOpen(true);
    } else {
      console.log("No exams selected for deletion");
    }
  };
  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteExams();
    handleCloseDeleteConfirmation();
  };

  return (
    <Container maxWidth="xxl">
      <Toolbar
        className="exams-category--header"
        sx={{ justifyContent: "space-between" }}
      >
        <Typography className="exams-category--header--text">
          Examinations
        </Typography>
        <div>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add Exam
          </Button>
          <span style={{ marginRight: 10 }} />
          <Button
            variant="contained"
            color="error"
            onClick={handleOpenDeleteConfirmation}
            disabled={selectedExams.length === 0} // Disable button if no exams are selected
          >
            Delete Exams
          </Button>
        </div>
      </Toolbar>
      <Grid
        container
        style={{ gridAutoFlow: "column", backgroundColor: "#d4d4d4" }}
        sx={{ py: 2, px: 1 }}
      >
        {displayedExams.map((exam, index) => (
          <Grid item xs={3} key={exam.id}>
            <div className="grid-item--wrapper" style={{ minHeight: "100%" }}>
              <Checkbox
                checked={selectedExams.includes(exam.id)}
                onChange={() => toggleCheckbox(exam.id)}
              />
              <ExamCard key={exam.id} exam={exam} />
            </div>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(exams.length / examsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& ul li button ": {
            color: "#4a4a4a",
          },
          "& ul li button svg": {
            fill: "#4a4a4a",
          },
          py: 1,
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#fff",
          boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>Add New Exam</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the selected exams?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ExamPage;
