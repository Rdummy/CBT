import React from "react";
import HeroTypewriter from "../components/HeroTypewriter";
import "../assets/styles/authentication.css";
import ForgotForm from "../components/Forms/ForgotForm";

function Forgot() {
  return (
    <div className="login-page-wrapper">
      <div className="login-page--hero brand-red-bg">
        <HeroTypewriter />
      </div>
      <div className="login-form-wrapper">
        <ForgotForm />
      </div>
    </div>
  );
}

export default Forgot;
