import React from 'react';
import Navbar from '../components/Navbar'
import "../assets/styles/dashboard.css"
import ExamPage from '../pages/exams.page';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <>
    <div className="dashboard-content" >
      <Navbar/>
      <Outlet/>
    </div>
    </>
  )
}

export default Dashboard