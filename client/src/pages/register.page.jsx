import React from 'react'
import HeroTypewriter from '../components/HeroTypewriter'
import "../assets/styles/authentication.css"
import RegistrationForm from '../components/Forms/RegistrationForm'

function Register() {
  return (
    <div className="login-page-wrapper">
        <div className="login-page--hero brand-red-bg">
            <HeroTypewriter/>
        </div>
        <div className="login-form-wrapper">
            <RegistrationForm/>
        </div>
    </div>
  )
}

export default Register