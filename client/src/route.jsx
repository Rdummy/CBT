import { createBrowserRouter, Outlet, RouterProvider,Route} from "react-router-dom";
import React from "react";
// import useAuth from './useAuth';
//Pages Route Imports
import Login from "./pages/login.page.jsx";
import Register from "./pages/register.page.jsx";
import Dashboard from "./pages/dashboard.page.jsx";
import SettingsPage from "./pages/settings.page.jsx";
import ExamPage from "./pages/exams.page.jsx";

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
      element: (
        <>
          <Dashboard />
        </>
      ),
      children: [
        { element: <ExamPage />, index:true },
        { path: "dashboard/settings", element: <SettingsPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default CBTRoute;
