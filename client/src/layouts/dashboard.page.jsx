import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../assets/styles/dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        const response = await axios.get(
          "http://localhost:3001/auth/user_type",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUserType(response.data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchUserType();
  }, []);

  const shouldRenderSidebar = () => {
    return userType === "admin";
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
