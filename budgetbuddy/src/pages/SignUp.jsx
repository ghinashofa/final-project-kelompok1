import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import sideRight from "../assets/sideRight.png";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                console.error("Sign-Up Error:", response.statusText);
            }
        } catch (error) {
            console.error("Sign-Up Error:", error);
        }
    };

    const handleGoogleSignUp = async (response) => {
        const { credential } = response;
        try {
            const res = await fetch("http://localhost:3001/google-signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_token: credential }),
            });

            if (res.ok) {
                navigate("/login");
            } else {
                console.error("Google Sign-Up Error:", res.statusText);
            }
        } catch (error) {
            console.error("Google Sign-Up Error:", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="1065345128503-n8v6n3a2e7a77ma66j76l8p11b7fmnmn.apps.googleusercontent.com">
            <div className="flex min-h-screen bg-white">
                <div className="flex w-full lg:w-1/2 items-center justify-center px-16 py-2 lg:px-12">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="flex flex-col gap-2 mb-8">
                            <h2 className="text-3xl font-medium text-gray-900">
                                Sign Up
                            </h2>
                            <p className="text-base text-[#4C3BCF]">
                                Create your account here
                            </p>
                        </div>

                        <div className="mt-10">
                            <form onSubmit={handleSignUp} className="">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="block w-full rounded-full mt-3 outline-none border border-[#cecece] border-opacity-100 p-3 px-4 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#4C3BCF] sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-2">
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
                                            className="block w-full rounded-full mt-3 outline-none border border-[#cecece] border-opacity-100 p-3 px-4 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#4C3BCF] sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center mt-12 rounded-full bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-medium py-3 text-sm shadow-sm hover:bg-[#2c1e90] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign Up
                                    </button>
                                    {/* <p className="mt-2 text-xs leading-5 text-gray-500">
                                        Already have an account?{" "}
                                        <a
                                            href="/login"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            Sign in
                                        </a>
                                    </p> */}
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
                            </div>

                            <div className="mt-4">
                                <GoogleLogin
                                    onSuccess={handleGoogleSignUp}
                                    onError={(response) =>
                                        console.error(
                                            "Google Sign-Up Error:",
                                            response
                                        )
                                    }
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                />
                            </div>
                            <p className="mt-4 text-sm text-gray-500 text-center">
                                Don't have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-indigo-600 hover:text-[#4132b3] hover:underline"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:flex lg:w-1/2">
                <img
                    alt="Login Background"
                    src={sideRight}
                    className="absolute inset-0 h-full w-full object-cover p-6 rounded-2xl"
                />
                <div className="absolute inset-0 flex items-start pt-24 justify-start px-28">
                    <div className="bg-gradient-radial from-white via-[#E4E4E4]/75 to-white/61 bg-[#B7E9F6] bg-opacity-25 rounded-lg p-16 backdrop-blur-lg">
                        <h1 className="text-white text-4xl font-semibold text-left py-6" style={{lineHeight:"140%"}}>
                            Manage Your Finances with BudgetBuddy.
                        </h1>
                    </div>
                </div>
            </div>
            </div>
        </GoogleOAuthProvider>
    );
}
