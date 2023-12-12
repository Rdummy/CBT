import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../assets/styles/authentication.css";
import NTS_Logo from "../assets/images/NTS_Logo.png";
import { Button } from "@mui/material";
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  Username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const LoginEvent = async (values) => {
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
        <Formik
          initialValues={{ Username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={LoginEvent}
        >
          {({ errors, touched }) => (
            <Form className="login-form">
              <img src={NTS_Logo} alt="Company Logo" className="logo" />
              <div className="signin--header">Sign In</div>
              <div className="fields-wrapper">
                <div className="form-label">Username</div>
                <Field
                  as="input"
                  name="Username"
                  placeholder="Username"
                  className="form-field"
                  error={errors.Username && touched.Username}
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="Username"
                />
                <div className="form-label">Password</div>
                <Field
                  as="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-field"
                  error={errors.password && touched.password}
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="password"
                />
              </div>

              {/* <div className="remember-me">
                  <Field type="checkbox" name="rememberMe" id="rememberMe" className="checkbox" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div> */}
              <Button
                type="submit"
                className="auth-button"
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
