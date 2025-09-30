"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterFormChange = (e: any) => {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: any) => {
    try {
      e.preventDefault();
      console.log(registerForm);

      let result = await axios.post(
        "http://localhost:5000/api/auth/register",
        registerForm
      );

      console.log(result);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-teal-800 mb-6">
          Create an Account
        </h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={registerForm.email}
              onChange={handleRegisterFormChange}
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
              value={registerForm.password}
              onChange={handleRegisterFormChange}
              placeholder="Enter your password"
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-lg font-semibold hover:bg-teal-800 transition"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-teal-300" />
          <span className="px-3 text-sm text-teal-600">OR</span>
          <hr className="flex-1 border-teal-300" />
        </div>

        <div className="flex justify-center">
          <Link href={"/"} className="text-xs text-teal-600 hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
