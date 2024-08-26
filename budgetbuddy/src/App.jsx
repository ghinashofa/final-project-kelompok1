import React from "react";
import "./App.css";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";

function App() {
    <>
        <RouterProvider router={router} />
    </>
}

export default App;
