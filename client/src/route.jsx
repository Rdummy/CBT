import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Route,
} from "react-router-dom";
import React from "react";
// import useAuth from './useAuth';
// Pages Route Imports
import Login from "./pages/login.page.jsx";
import Register from "./pages/register.page.jsx";

import Dashboard from "./layouts/dashboard.page.jsx";
//import SettingsPage from "./pages/settings.page.jsx";
import ExamPage from "./pages/exams.page.jsx"; // In progress
import TakeExamPage from "./pages/take-exam-page.jsx";
import ReviewExamPage from "./pages/review-exam-page.jsx";
import EditExamPage from "./pages/edit-exam-page.jsx";
import ExamDetailsPage from "./pages/exam-details.jsx";
import ResultExamPage from "./pages/result-page.jsx";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import { AuthProvider, useAuth } from "./contexts/auth-context.jsx";
import CreateExam from "./pages/CreateExam.jsx";
import CreateContent from "./pages/create-content.jsx";
import OverviewAdmin from "./pages/overview-page.jsx";
import SettingsAdmin from "./pages/settings-page.jsx";
import EmployeesAdmin from "./pages/employees-admin.jsx";
import Forgot from "./pages/forgot.page.jsx";
import CreateContentPage from "./pages/content.page.jsx";
import ContentDetailsPage from "./pages/content-details.jsx";
import Assign from "./pages/Assign.jsx";
// import ReviewExamPage1 from "./pages/review-exam1.jsx";

function CBTRoute() {
  const { user, isAuthenticated } = useAuth();
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
      path: "/forgot",
      element: <Forgot />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        // Protect all routes within the "/dashboard" route
        // <AuthProvider>
        <PrivateRoute path="/" roles={[user]}>
          <Outlet />
        </PrivateRoute>,
        // </AuthProvider>
        { element: <ExamPage />, index: true },
        {
          path: "/dashboard/overview",
          element: <OverviewAdmin />,
        },
        {
          path: "/dashboard/settings",
          element: <SettingsAdmin />,
        },
        {
          path: "/dashboard/create-content",
          element: <CreateContentPage />,
        },
        {
          path: "/dashboard/employees",
          element: <EmployeesAdmin />,
        },
        {
          path: "/dashboard/create-content/:examId/create-review",
          element: <CreateContent />,
        },
        {
          path: "/dashboard/create-content/:examId/create-exam",
          element: <CreateExam />,
        },
        {
          path: "/dashboard/create-content/:examId/assign",
          element: <Assign />,
        },
        { path: "/dashboard/exams/:examId", element: <ExamDetailsPage /> },
        {
          path: "/dashboard/create-content/:examId",
          element: <ContentDetailsPage />,
        },
        {
          path: "/dashboard/exams/:examId/take-exam",
          element: <TakeExamPage examId />,
        },
        {
          path: "exams/:examId/review",
          element: <ReviewExamPage examId />,
        },
        {
          path: "exams/:examId/edit",
          element: <EditExamPage examId />,
        },
        {
          path: "/dashboard/exams/:examId/take-exam/submit",
          element: <ReviewExamPage examId />,
        },
        {
          path: "/dashboard/exams/:examId/take-exam/result/:score",
          element: <ResultExamPage examId />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default CBTRoute;
