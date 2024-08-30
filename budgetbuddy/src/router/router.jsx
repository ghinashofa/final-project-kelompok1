import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Transaction from "@/pages/Transaction";
import Budgeting from "@/pages/Budgeting";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";

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