import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import sideRight from "../assets/side_right.png"

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Sign-Up Error:', response.statusText);
      }
    } catch (error) {
      console.error('Sign-Up Error:', error);
    }
  };

  const handleGoogleSignUp = async (response) => {
    const { credential } = response;
    try {
      const res = await fetch('http://localhost:3001/google-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: credential }),
      });

      if (res.ok) {
        navigate('/login');
      } else {
        console.error('Google Sign-Up Error:', res.statusText);
      }
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="1065345128503-n8v6n3a2e7a77ma66j76l8p11b7fmnmn.apps.googleusercontent.com">
      <div className="flex min-h-screen flex-1 bg-gray-50">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up for an Account
              </h2>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSignUp} className="">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#4C3BCF] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
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
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 py-2 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#4C3BCF] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center'>
                  <button
                    type="submit"
                    className="flex w-full justify-center mt-8 rounded-md bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-semibold py-2.5 text-sm leading-6 shadow-sm hover:bg-[#3527a3] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </a>
                  </p>
                </div>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-gray-50 px-6 text-gray-900">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <GoogleLogin
                  onSuccess={handleGoogleSignUp}
                  onError={(response) => console.error('Google Sign-Up Error:', response)}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block bg-[#4C3BCF]">
          <img
            alt=""
            src={sideRight}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
