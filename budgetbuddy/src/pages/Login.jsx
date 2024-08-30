import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import sideRight from "../assets/side_right.png"
const API_URL = 'http://localhost:3000/users';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
      const users = await response.json();

      if (users.length > 0) {
        localStorage.setItem('authToken', JSON.stringify(users[0]));
        navigate('/');
      } else {
        console.error('Login Error: Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log('Google login success:', response);

    const token = response.credential;

    try {
      const res = await fetch('http://localhost:3001/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('authToken', JSON.stringify(data.user));
        navigate('/'); 
      } else {
        console.error('Google login Error:', data.message);
      }
    } catch (error) {
      console.error('Google login Error:', error.message);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#4C3BCF]">
        <img
          alt="Login Background"
          src={sideRight}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sign in to your account</h2>

          <form onSubmit={handleLogin} className="">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
              <div className="mt-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mt-4">Password</label>
              <div className="mt-1">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center mt-4">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-6'>
              <button
                type="submit"
                className="flex w-full justify-center mt-8 rounded-md bg-gradient-to-r from-[#4C3BCF] via-[#5C50E7] to-[#705FF3] text-white font-semibold py-2.5 text-sm leading-6 shadow-sm hover:bg-[#3527a3] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Don't have an account?{' '}
                <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign up</a>
              </p>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm font-medium text-gray-900">
                <span className="bg-gray-100 px-4">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                logo="google"
                className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
