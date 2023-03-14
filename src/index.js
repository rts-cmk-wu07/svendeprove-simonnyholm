import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import TokenProvider from "./contexts/TokenProvider";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ClassDetails from "./pages/ClassDetails";
import "./index.css";
import Activities from "./pages/Activities";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/aktiviteter",
        element: <Activities />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/classdetails/:id",
        element: <ClassDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </React.StrictMode>
);
