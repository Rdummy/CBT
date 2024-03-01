import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NTS_Logo from "../../assets/images/NTS_Logo.png";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginSchema = Yup.object().shape({
  Username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  const [openDialog, setOpenDialog] = useState(false); // State to handle dialog visibility
  const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts
  const [locked, setLocked] = useState(false); // State to manage lock status
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (loginAttempts >= 5) {
      setLocked(true);
      const timer = setTimeout(() => {
        setLocked(false);
        setLoginAttempts(0);
      }, 300000); // Lock for 5 minutes (300,000 milliseconds)
      return () => clearTimeout(timer);
    }
  }, [loginAttempts]);

  const loginEvent = async (data) => {
    if (locked) {
      setOpenDialog(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/signin", {
        username: data.Username,
        password: data.password,
      });

      // Save the token to localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form onSubmit={handleSubmit(loginEvent)} className="login-form">
          <img src={NTS_Logo} alt="Company Logo" className="logo" />
          <div className="signin--header">Sign In</div>
          <div className="fields-wrapper">
            <div className="form-label">Username</div>
            <input
              {...register("Username")}
              placeholder="Please enter Username"
              className={`form-field ${errors.Username && "error"}`}
            />
            <div className="error-message">{errors.Username?.message}</div>
            <div className="form-label">Password</div>
            <input
              {...register("password")}
              type="password"
              placeholder="Please enter Password"
              className={`form-field ${errors.password && "error"}`}
            />
            <div className="error-message">{errors.password?.message}</div>
          </div>
          <Button type="submit" className="auth-button" disabled={isSubmitting}>
            Login
          </Button>
          <div className="end-footer">
            <p className="forgot-password">
              Forgot your password? <a href="/forgot">Reset it here</a>
            </p>
            <hr />
            <p className="signup-text">
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          {locked ? (
            <DialogContentText>
              Please try again in 5 minutes.
            </DialogContentText>
          ) : (
            <DialogContentText>
              Username or Password is correct.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginForm;
