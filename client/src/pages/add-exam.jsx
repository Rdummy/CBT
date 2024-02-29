import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const AddExamForm = () => {
  const initialFormData = {
    title: "",
    description: "",
    status: "not taken",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData);
    setFormData(initialFormData);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: 20, background: "white" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextareaAutosize
              rowsMin={4}
              placeholder="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ width: "100%", marginTop: 15 }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value="not taken">Not Taken</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: 15 }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddExamForm;
