"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfileManagement() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile_management",
        form,
        { withCredentials: true }
      );

      alert(res.data.message || "Profile updated successfully!");
      router.push("/homepage");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-teal-800 mb-6">
          Profile Management
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-3 py-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              placeholder="Enter middle name"
              className="w-full px-3 py-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              placeholder="Enter last name"
              className="w-full px-3 py-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
