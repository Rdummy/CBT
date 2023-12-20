import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Route,
} from "react-router-dom";
import React from "react";
// import useAuth from './useAuth';
//Pages Route Imports
import Login from "./pages/login.page.jsx";
import Register from "./pages/register.page.jsx";
import Dashboard from "./layouts/dashboard.page.jsx";
import SettingsPage from "./pages/settings.page.jsx";
import ExamPage from "./pages/exams.page.jsx";
import TakeExamPage from "./pages/take-exam-page.jsx";
import ReviewExamPage from "./pages/review-exam-page.jsx";
import EditExamPage from "./pages/edit-exam-page.jsx";
import ExamDetailsPage from "./pages/exam-details.jsx";
import exams from "./models/exam-data.jsx";
import Navbar from "./components/Navbar.jsx";

function CBTRoute() {
  const ProtectedRoute = ({ component: Component, ...props }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return <Route {...props} component={Component} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        { element: <ExamPage />, index: true },
        { path: "dashboard/settings", element: <SettingsPage /> },
        { path: "/dashboard/exams/:examId", element: <ExamDetailsPage /> },
        {
          path: "/dashboard/exams/:examId/take-exam",
          element: <TakeExamPage examId />,
        },
        {
          path: "/dashboard/exams/:examId/review",
          element: <ReviewExamPage examId />,
        },
        {
          path: "/dashboard/exams/:examId/edit",
          element: <EditExamPage examId />,
        },

        {path: "/dashboard/exams/:examId/take-exam/submit", element: <ReviewExamPage examId />,},
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default CBTRoute;
