"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LogoutBtn = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  // ✅ Check login state when component mounts
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();

        setLoggedIn(!!data.user); // true if user exists
      } catch (error) {
        console.error("Auth check failed", error);
        setLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  async function logout() {
    try {
      // Call backend logout (clear cookie)
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setLoggedIn(false); // instantly hide button
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  // While checking auth → show nothing (avoids flicker)
  if (loggedIn === null) return null;

  if (!loggedIn) return null;

  return <><button onClick={logout}>Logout</button></>;
};

export default LogoutBtn;
