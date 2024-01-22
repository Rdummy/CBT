import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Select, MenuItem, TextField, InputLabel } from "@mui/material";
import axios from "axios";
import NTS_Logo from "../../assets/images/NTS_Logo.png";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:3001/auth/signup", formData);
      alert("Registration Completed");

      localStorage.setItem("user_type", formData.user_type);
      localStorage.setItem("username", formData.username);

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        user_role: "",
        user_type: "",
      });
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      setIsSubmitting(false);
      // Handle error
    }
  };

  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <img src={NTS_Logo} alt="Company Logo" className="logo" />
          <div
            className="signin--header"
            style={{ fontWeight: "700", marginBottom: "1rem" }}
          >
            Sign Up
          </div>
          <div className="fields-wrapper" style={{ gap: "0.5rem" }}>
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
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
            <div>
              <InputLabel
                htmlFor="user-role"
                style={{ justifyContent: "left", display: "flex" }}
              >
                Role
              </InputLabel>
              <Select
                fullWidth
                size="small"
                label="Role"
                id="user-role"
                name="user_role"
                value={formData.user_role}
                onChange={handleChange}
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Software Developer">
                  Software Developer
                </MenuItem>
                <MenuItem value="Copy Editor">Copy Editor</MenuItem>
                <MenuItem value="Pre Editor">Pre Editor</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel
                htmlFor="user-type"
                style={{ justifyContent: "left", display: "flex" }}
              >
                User Type
              </InputLabel>
              <Select
                fullWidth
                size="small"
                label="User Type"
                id="user-type"
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </div>
          </div>
          <Button type="submit" className="auth-button" disabled={isSubmitting}>
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
