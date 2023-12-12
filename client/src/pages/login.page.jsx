import React from 'react'
import HeroTypewriter from '../components/HeroTypewriter'
import "../assets/styles/authentication.css"
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <div className="login-page-wrapper">
        <div className="login-page--hero brand-red-bg">
            <HeroTypewriter/>
        </div>
        <div className="login-form-wrapper">
            <LoginForm/>
        </div>
    </div>
  )
}

export default Login