"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleChangeForm = (e: any) => {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginFormData,
        {
          withCredentials: true,
        }
      );
      console.log(result);
      router.push("/homepage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">
          Sign In to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleChangeForm}
              required
              placeholder="Enter your email"
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleChangeForm}
              required
              placeholder="Enter your password"
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-lg font-semibold hover:bg-teal-800 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-teal-300" />
          <span className="px-3 text-sm text-teal-600">OR</span>
          <hr className="flex-1 border-teal-300" />
        </div>

        <div className="flex justify-center">
          <a href="/register" className="text-xs text-teal-600 hover:underline">
            Don’t have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
