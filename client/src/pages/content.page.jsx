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
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ContentCard from "../components/ContentCard";
import "../assets/styles/dashboard.css";

function CreateContentPage() {
  const [openModal, setOpenModal] = useState(false);
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    _id: "",
  });

  useEffect(() => {
    getExams().then((response) => {
      setExams(response);
    });
  }, []);

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
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding new exam:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ alignItems: "center" }}>
      <Toolbar
        className="exams-category--header"
        sx={{ justifyContent: "space-between" }}
      >
        <Typography sx={{ opacity: 0 }}>
          .............................
        </Typography>
        <Typography className="exams-category--header--text">TOPICS</Typography>

        <Button className="create-topic-button" onClick={handleOpenModal}>
          Create Topic
        </Button>
      </Toolbar>
      <Grid container spacing={0.5} alignItems="center" justifyContent="center">
        {exams.map((exam, index) => (
          <Grid
            className="grid-card-content"
            vitem
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={exam._id || index}
          >
            <ContentCard
              exam={exam}
              updatedAt={exam.updatedAt} // Ensure this data is available
            />
          </Grid>
        ))}
      </Grid>

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
