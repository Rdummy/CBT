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
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import ContentCard from "../components/ContentCard";
import "../assets/styles/dashboard.css";

function CreateContentPage() {
  const [page, setPage] = useState(1);
  const examsPerPage = 4;
  const [openModal, setOpenModal] = useState(false);
  const [exams, setExams] = useState([]); // Initial exams data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    _id: "",
  });

  // State to manage exams

  useEffect(() => {
    getExams().then((response) => {
      setExams(response);
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
    let response = await axios.get(
      "http://localhost:3001/exam/content/exam-title"
    );
    return response.data;
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

      setExams((prevExams) => [...prevExams, newExam]);

      setDisplayedExams((prevDisplayedExams) => [
        ...prevDisplayedExams,
        newExam,
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
        sx={{ justifyContent: "space-between" }}
      >
        <Typography className="exams-category--header--text">Topics</Typography>
        <div>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Create Topic
          </Button>
        </div>
      </Toolbar>
      <Grid
        container
        style={{ gridAutoFlow: "column", backgroundColor: "#d4d4d4" }}
        sx={{ py: 2, px: 1 }}
      >
        {displayedExams.map((exam, index) => (
          <Grid item xs={3} key={`${exam.id}-${index}`}>
            <div className="grid-item--wrapper">
              <ContentCard
                key={`${exam.id}-${index}`}
                exam={exam}
                updatedAt={exam.updatedAt} // Ensure this data is available
                style={{ minHeight: "300px" }}
              />
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
          <DialogTitle>Add New Topic</DialogTitle>
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
    </Container>
  );
}

export default CreateContentPage;
