"use client";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function RegisterForm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", name: "", password: "", password2: "" });
  const MySwal = withReactContent(Swal);

  const validateForm = () => {
    if (userInfo.password != userInfo.password2) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return false;
    }
    return true;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      }),
    };
    const res = await fetch("/api/register", options);
    if (!res.ok) {
      if (res.status == 422) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exists!",
        });
        return;
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    if (data) router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-3/5 items-center justify-center text-3xl font-extralight"
    >
      <h1 className="text-left block w-2/3 text-4xl">Register</h1>
      <label htmlFor="email" className="flex flex-col  justify-center w-2/3 ">
        <p className="text-[#777] text-xs m-2">Email</p>
        <input
          type="email"
          name="email"
          id="email"
          className="text-[#333] border-2 border-[#5856DC] opacity-50 focus:opacity-100 rounded-lg w-full h-10  text-sm px-2"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, email: target.value });
          }}
        />
      </label>
      <label htmlFor="name" className="flex flex-col  justify-center w-2/3 ">
        <p className="text-[#777] text-xs m-2">Name</p>

        <input
          type="text"
          maxLength={10}
          name="name"
          id="name"
          className="text-[#333] border-2 border-[#5856DC] opacity-50 focus:opacity-100  rounded-lg w-full h-10  text-sm px-2"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, name: target.value });
          }}
        />
      </label>
      <label htmlFor="password" className="flex flex-col  justify-center w-2/3 ">
        <p className="text-[#777] text-xs m-2">Password</p>

        <input
          type="password"
          name="password"
          className="text-[#333] border-2 border-[#5856DC] opacity-50 focus:opacity-100  rounded-lg w-full h-10  text-sm px-2"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, password: target.value });
          }}
        />
      </label>
      <label htmlFor="password2" className="flex flex-col  justify-center w-2/3 ">
        <p className="text-[#777] text-xs m-2">Reapeat password</p>

        <input
          type="password"
          name="password2"
          id="password2"
          className="text-[#333] border-2 border-[#5856DC]  opacity-50 focus:opacity-100 rounded-lg w-full h-10  text-sm px-2"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, password2: target.value });
          }}
        />
      </label>
      <button
        type="submit"
        className="text-white bg-[#2523A8] opacity-30 rounded-lg w-2/3 h-10  text-sm px-2 mt-6"
      >
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
