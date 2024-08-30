import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
]);