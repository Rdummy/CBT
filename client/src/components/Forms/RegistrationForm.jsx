import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import NTS_Logo from "../../assets/images/NTS_Logo.png";


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
      // Error handling remains the same as in your original code
      // ...
      setIsSubmitting(false);
    }
  };


  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <img src={NTS_Logo} alt="Company Logo" className="logo" />
          <div className="signin--header" style={{ fontWeight: "700", marginBottom: "1rem" }}>Sign In</div>
          <div className="fields-wrapper" style={{ gap: "0.5rem" }}>
            {/* TextField component is used for consistent styling */}
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Role"
              name="user_role"
              type="text"
              value={formData.user_role}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="User Type"
              name="user_type"
              type="text"
              value={formData.user_type}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            Register
          </Button>
          <div className="end-footer">
            <p className="login-text">
              Already have an account? <a href="/">Log In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};


export default RegistrationForm;
