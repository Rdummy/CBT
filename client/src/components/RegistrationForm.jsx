import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    user_role: "",
    user_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3001/auth/signup", formData);
      alert("Registration Completed");
      setFormData({
        email: "",
        password: "",
        username: "",
        user_role: "",
        user_type: "",
      });
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(`Server Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network Error: Please check your internet connection");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
      setIsSubmitting(false);
    }
  };
  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="fields-wrapper">
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Role"
              name="user_role"
              type="text"
              value={formData.user_role}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="User Type"
              name="user_type"
              type="text"
              value={formData.user_type}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="auth-button" disabled={isSubmitting}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
