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
    loader: () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          return redirect("/");
        } catch (err) {
          console.log(err);
          return null;
        }
      } else {
        return null;
      }
    },
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        return redirect("/");
      } else {
        return null;
      }
    },
  },
  {
    path: "/",
    element: <Dashboard />,
    loader: () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        return null;
      } else {
        return redirect("/login");
      }
    },
  },
  {
    path: "/transaction",
    element: <Transaction />,
    loader: () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        return null;
      } else {
        return redirect("/login");
      }
    },
  },
  {
    path: "/Budgeting",
    element: <Budgeting />,
    loader: () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        return null;
      } else {
        return redirect("/login");
      }
    },
  },
  {
    path: "/signout",
    loader: () => {
      localStorage.removeItem("authToken");
      return redirect("/login");
    },
  },
]);
