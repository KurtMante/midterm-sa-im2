"use client";
import { signIn } from "next-auth/react";

const GoogleSignin = () => {
  return (
    <button
    onClick={() => signIn('google')}
      className="bg-slate-50 p-2 rounded flex justify-center cursor-pointer"
      
    >
      <span>
        <img className="w-[20px]" src={"/google.png"} alt="" />
      </span>
      Signin with Google
    </button>
  );
};

export default GoogleSignin;
