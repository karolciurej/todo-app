"use client";
import React from "react";
import LoginForm from "../components/LoginForm";

function SignIn() {
  return (
    <div className="grid place-items-center h-screen w-screen">
      <div className="w-[70vw] h-[70vh] flex items-center justify-center bg-white rounded-[40px]  max-w-[950px] min-w-[800px]">
        <div className="w-2/5 bg-[#2523A8] h-full opacity-30"></div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}

export default SignIn;
