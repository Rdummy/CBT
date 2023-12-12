import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../assets/styles/authentication.css";
import NTS_Logo from "../assets/images/NTS_Logo.png";
import { Button } from "@mui/material";
import axios from 'axios';


const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});


const RegistrationForm = () => {
  const navigate = useNavigate();


  const handleRegister = async (values) => {
    try {
    //   await axios.post('http://localhost:5000/register', values);
      console.log('User registered successfully');
      // Optionally, you can redirect the user to the login page after registration
      navigate("/login");
    } catch (error) {
      console.error('Error registering user:', error.response.data.error);
    }
  };


  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={RegistrationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form className="auth-form">
              <img src={NTS_Logo} alt="Company Logo" className="logo" />
              <div className="signup--header">Sign Up</div>
              <div className="fields-wrapper">
                <div className="form-label">Email</div>
                <Field
                  as="input"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`form-field ${errors.email && touched.email ? 'error' : ''}`}
                />
                <ErrorMessage component="div" className="error-message" name="email" />
                <div className="form-label">Password</div>
                <Field
                  as="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`form-field ${errors.password && touched.password ? 'error' : ''}`}
                />
                <ErrorMessage component="div" className="error-message" name="password" />
              </div>
              <Button type="submit" className="auth-button">Register</Button>
              <div className="end-footer">
                <p className="login-text">
                  Already have an account? <a href="/">Log In</a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default RegistrationForm;
