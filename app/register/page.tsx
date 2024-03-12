"use client";
import React, { FormEventHandler, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Register() {
  return (
    <div className="grid place-items-center h-screen w-screen">
      <div className="w-[70vw] h-[70vh] flex items-center justify-center bg-white rounded-[40px]  max-w-[950px] min-w-[800px]">
        <div className="w-2/5 bg-[#2523A8] h-full opacity-30"></div>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
}

export default Register;
