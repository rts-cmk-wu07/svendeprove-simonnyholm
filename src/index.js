import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import TokenProvider from "./contexts/TokenProvider";
import UserDataProvider from "./contexts/UserDataProvider";
import Login from "./pages/Login";
import "./index.css";
import Activities from "./pages/Activities";
import Welcome from "./pages/Welcome";
import ActivityDetails from "./pages/ActivityDetails";
import Search from "./pages/Search";
import Calendar from "./pages/Calendar";
import InstructorDetails from "./pages/InstructorDetails";

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
      {
        path: "/holdliste/:id",
        element: (
          <ProtectedRoute>
            <InstructorDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TokenProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </TokenProvider>
  </React.StrictMode>
);
