import React from 'react';
import Navbar from '../components/Navbar'
import "../assets/styles/dashboard.css"
import ExamPage from '../pages/exams.page';

function Dashboard() {
  return (
    <>
    <Navbar/>
    <div className="dashboard-content">
      <ExamPage/>
    </div>
    </>
  )
}

export default Dashboard