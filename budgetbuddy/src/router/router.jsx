import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Transaction from "@/pages/Transaction";
import Budgeting from "@/pages/Budgeting";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/transaction",
      element: <Transaction />,
    },
    {
      path: "/Budgeting",
      element: <Budgeting />,
    }
]);