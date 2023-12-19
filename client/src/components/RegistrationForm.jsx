import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import NTS_Logo from "../assets/images/NTS_Logo.png";


const StyledTextField = styled(TextField)`
  .MuiTextField-root .field-wrapper  {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

`;
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
    <>
      <div className="auth-container-wrapper">
        <div className="auth-container">
          <form onSubmit={handleSubmit} className="auth-form">
        <img src={NTS_Logo} alt="Company Logo" className="logo" />
              <div className="signin--header" style={{fontWeight: "700", marginBottom: "1rem"}}>Sign In</div>
            <div className="fields-wrapper" style={{ gap: "0.5rem"}}>
              <StyledTextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{padding: "0px !important"}}
                  sx={{ my: 0,  }}
              />
              <StyledTextField
                fullWidth
                size="small"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                style={{padding: "0px !important"}}
                  sx={{ my: 0,  }}
              />
              <StyledTextField
                fullWidth
                size="small"
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                style={{padding: "0px !important"}}
                  sx={{ my: 0,  }}
              />
              <StyledTextField
                fullWidth
                size="small"
                label="Role"
                name="user_role"
                type="text"
                value={formData.user_role}
                onChange={handleChange}
                style={{padding: "0px !important"}}
                  sx={{ my: 0,  }}
              />
              <StyledTextField
                fullWidth
                size="small"
                label="User Type"
                name="user_type"
                type="text"
                value={formData.user_type}
                onChange={handleChange}
                style={{padding: "0px !important"}}
                  sx={{ my: 0,  }}
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
    </>
  );
};

export default RegistrationForm;
