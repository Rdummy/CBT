import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import NTS_Logo from "../../assets/images/NTS_Logo.png";

const ForgotForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3001/auth/forgot-password", { email });
      alert("Password reset email sent!");
      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      // Handle error
      setIsSubmitting(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <img src={NTS_Logo} alt="Company Logo" className="logo" />
          <div
            className="forgot-password--header"
            style={{ fontWeight: "700", marginBottom: "1rem" }}
          >
            Forgot Password
          </div>
          <div className="fields-wrapper" style={{ gap: "0.5rem" }}>
            {/* TextField component is used for consistent styling */}
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="auth-button" disabled={isSubmitting}>
            Reset Password
          </Button>
          <div className="end-footer">
            <p className="login-text">
              Remembered your password? <a href="/">Log In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotForm;
