import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import sideRight from "../assets/sideRight.png";
import logo from "../assets/logo.png";
const API_URL = "http://localhost:3000/users";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${API_URL}?email=${email}&password=${password}`
            );
            const users = await response.json();

            if (users.length > 0) {
                localStorage.setItem("authToken", JSON.stringify(users[0]));
                navigate("/");
            } else {
                console.error("Login Error: Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error.message);
        }
    };

    const handleGoogleSuccess = async (response) => {
        console.log("Google login success:", response);

        const token = response.credential;

        try {
            const res = await fetch("http://localhost:3001/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("authToken", JSON.stringify(data.user));
                navigate("/");
            } else {
                console.error("Google login Error:", data.message);
            }
        } catch (error) {
            console.error("Google login Error:", error.message);
        }
    };

    const handleGoogleFailure = (response) => {
        console.error("Google login failed:", response);
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="relative hidden lg:flex lg:w-1/2">
                <img
                    alt="Login Background"
                    src={sideRight}
                    className="absolute inset-0 h-full w-full object-cover p-4 rounded-2xl"
                />
                <div className="absolute inset-0 flex items-start pt-24 justify-center">
                    <div className="bg-gradient-radial from-white via-[#E4E4E4]/75 to-white/61 bg-[#B7E9F6] bg-opacity-25 rounded-lg p-16 backdrop-blur-lg">
                        <h1 className="text-white text-3xl font-semibold text-left leading-10">
                            Manage Your Finances <br /> with Ease.
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center px-16 py-2 lg:px-12">
                <div className="w-full max-w-md">
                    {/* <div className="flex flex-row items-center -ml-24 -mt-4 gap-4 mb-20">
                        <img src={logo} alt="" className="h-8 w-auto" />
                        <h1 className="text-xl font-semibold" style={{fontFamily:"Quicksand"}}>BudgetBuddy</h1>
                    </div> */}
                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-3xl font-medium text-gray-900">
                            Sign in
                        </h2>
                        <p className="text-base text-[#4C3BCF]">
                            Welcome back!
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-full mt-3 outline-none border border-[#cecece] border-opacity-100 p-3 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#4C3BCF] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900 mt-4"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="block w-full rounded-full mt-3 outline-none border border-[#cecece] border-opacity-100 p-3 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#4C3BCF] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-normal text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center mt-12 rounded-full bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-medium py-3 text-sm shadow-sm hover:bg-[#2c1e90] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center"
                            >
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium text-gray-900">
                                <span className="bg-white px-4 text-gray-600 font-normal">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onFailure={handleGoogleFailure}
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="w-full flex items-center justify-center rounded-full border border-[#4C3BCF] bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Sign in with Google
                                    </button>
                                )}
                            />
                            <p className="mt-4 text-sm text-gray-500 text-center">
                                Don't have an account?{" "}
                                <a
                                    href="/signup"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
