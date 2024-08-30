import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
<<<<<<< HEAD
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
=======
import Transaction from "@/pages/Transaction";
import Budgeting from "@/pages/Budgeting";
>>>>>>> 9fded75073b4e339724d5a1d6e1faed7e9afcdb3

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