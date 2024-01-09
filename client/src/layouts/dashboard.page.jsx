import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Retrieve user_type from local storage
    const storedUserType = localStorage.getItem("user_type");
    setUserType(storedUserType);
  }, []);

  const shouldRenderSidebar = () => {
    return userType === "admin"; // Render Sidebar if user_type is "admin"
  };

  return (
    <>
      <div className="dashboard-content">
        <Navbar />

        <div
          className={
            shouldRenderSidebar() ? "dashboard__admin" : "dashboard__user"
          }
        >
          {shouldRenderSidebar() && <Sidebar />}
          <Outlet
            className={
              shouldRenderSidebar()
                ? "outlet--with-sidebar"
                : "outlet--full-width"
            }
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
