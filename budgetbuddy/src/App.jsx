import React from "react";
import "./App.css";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId="1065345128503-n8v6n3a2e7a77ma66j76l8p11b7fmnmn.apps.googleusercontent.com">
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    );
}

export default App;
