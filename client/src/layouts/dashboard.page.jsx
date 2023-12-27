import React from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/dashboard.css";
import ExamPage from "../pages/exams.page";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const { isAdmin } = useAuth();
  return (
    <>
      <div className="dashboard-content">
        <Navbar />

        <div className={isAdmin ? "dashboard__admin" : "dashboard__user"}>
          {isAdmin ? <Sidebar /> : ""}
          <Outlet  className={isAdmin ? "outlet--with-sidebar" : "outlet--full-width"} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
