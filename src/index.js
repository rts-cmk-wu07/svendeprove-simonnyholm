import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import TokenProvider from "./contexts/TokenProvider";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ClassDetails from "./pages/ActivityDetails";
import "./index.css";
import Activities from "./pages/Activities";
import Welcome from "./pages/Welcome";
import ActivityDetails from "./pages/ActivityDetails";
import Search from "./pages/Search";
import Calendar from "./pages/Calendar";

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
        path: "/soeg",
        element: <Search />,
      },
      {
        path: "/kalender",
        element: <Calendar />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/aktivitet/:id",
        element: <ActivityDetails />,
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
