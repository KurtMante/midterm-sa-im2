"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OnBoard() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/onboarding",
        form,
        { withCredentials: true }
      );

      if (res.status === 200) {
        router.push("/homepage");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-teal-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-teal-800 mb-4">
          Complete Your Onboarding
        </h1>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Middle Name
          </label>
          <input
            type="text"
            name="middlename"
            value={form.middlename}
            onChange={handleChange}
            placeholder="Enter your middle name"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-lg font-semibold hover:bg-teal-800 transition"
        >
          Finish Onboarding
        </button>
      </form>
    </div>
  );
}
