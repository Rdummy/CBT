import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Select, MenuItem, TextField, InputLabel } from "@mui/material";
import axios from "axios";
import NTS_Logo from "../../assets/images/NTS_Logo.png";

const RegistrationForm = () => {
  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form className="auth-form">
          <img src={NTS_Logo} alt="Company Logo" className="logo" />
          <div
            className="signin--header"
            style={{ fontWeight: "700", marginBottom: "1rem" }}
          >
            Reset Password
          </div>
          <div className="fields-wrapper" style={{ gap: "0.5rem" }}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              type="email"
            />
            <TextField
              fullWidth
              size="small"
              label="Username"
              name="username"
              type="text"
            />
            <TextField
              fullWidth
              size="small"
              label="New Password"
              name="newPassword"
              type="password"
            />
            <TextField
              fullWidth
              size="small"
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
            />
          </div>
          <Button type="submit" className="auth-button">
            Reset
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
