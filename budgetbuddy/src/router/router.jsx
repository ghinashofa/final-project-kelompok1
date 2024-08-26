import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    }
]);