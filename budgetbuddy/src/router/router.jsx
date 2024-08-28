import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Transaction from "@/pages/Transaction";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/transaction",
      element: <Transaction />,
    }
]);