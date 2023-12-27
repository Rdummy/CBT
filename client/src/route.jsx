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
import SettingsPage from "./pages/settings.page.jsx";
import ExamPage from "./pages/exams.page.jsx";
import TakeExamPage from "./pages/take-exam-page.jsx";
import ReviewExamPage from "./pages/review-exam-page.jsx";
import EditExamPage from "./pages/edit-exam-page.jsx";
import ExamDetailsPage from "./pages/exam-details.jsx";
import exams from "./models/exam-data.jsx";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from './components/Auth/PrivateRoute.jsx'
import { AuthProvider, useAuth } from "./contexts/auth-context.jsx";
import CreateExam from "./pages/create-content.jsx";
import CreateContent from "./pages/create-content.jsx";

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
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        // Protect all routes within the "/dashboard" route
        // <AuthProvider>
        <PrivateRoute path="/" roles={[user]}>
          <Outlet />
        </PrivateRoute>
        // </AuthProvider>
          ,
        { element: <ExamPage />, index: true },
        { path: "dashboard/settings", element: <SettingsPage /> },
        {
          path: "/dashboard/exams/:examId/create-content",
          element: <CreateContent />,
        },
        { path: "/dashboard/exams/:examId", element: <ExamDetailsPage /> },
        {
          path: "exams/:examId/take-exam",
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
        { path: "exams/:examId/take-exam/submit", element: <ReviewExamPage examId /> },
      ],
    },
  ]);

  return (
    <AuthProvider> {/* Wrap the entire RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  );}

export default CBTRoute;