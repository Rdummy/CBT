import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import NTS_Logo from "../../assets/images/NTS_Logo.png";
import axios from 'axios';
import {yupResolver} from "@hookform/resolvers/yup"

const LoginSchema = Yup.object().shape({
  Username: Yup.string().required("Username is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
});


const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const navigate = useNavigate();


  const loginEvent = async (values) => {
    try {
      // const response = await axios.post("https://localhost:5000/login", values);
      // const token = response.data.token;
      //saves the token in local storage
      // localStorage.setItem("jwtToken", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error.response.data.error);
    }
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
              placeholder="Username"
              className={`form-field ${errors.Username && "error"}`}
            />
            <div className="error-message">{errors.Username?.message}</div>
            <div className="form-label">Password</div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`form-field ${errors.password && "error"}`}
            />
            <div className="error-message">{errors.password?.message}</div>
          </div>
          <Button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            Login
          </Button>
          <div className="end-footer">
            <p className="forgot-password">
              Forgot your password? <a href="#">Reset it here</a>
            </p>
            <hr />
            <p className="signup-text">
              Don't have an account? <a href='/register'>Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};


export default LoginForm;
