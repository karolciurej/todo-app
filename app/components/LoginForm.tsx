"use client";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function LoginForm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const MySwal = withReactContent(Swal);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    console.log(!res?.error);
    if (!res?.error) {
      router.refresh();
      router.replace("/dashboard");
      return;
    }
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email or password!",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-3/5 items-center justify-center text-3xl font-extralight"
    >
      <h1 className="text-left block w-2/3 text-4xl">Login</h1>
      <label htmlFor="email" className="flex flex-col  justify-center w-2/3 ">
        <p className="text-[#777] text-xs m-2">Email</p>
        <input
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, email: target.value });
          }}
          type="email"
          className="text-[#333] border-2 border-[#5856DC] opacity-50 focus:opacity-100  rounded-lg w-full h-10  text-sm px-2"
        ></input>
      </label>
      <label htmlFor="password" className="flex flex-col  justify-center w-2/3 ">
        <p className="text-[#777] text-xs m-2">Password</p>
        <input
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, password: target.value });
          }}
          type="password"
          className="text-[#333] border-2 border-[#5856DC]  opacity-50 focus:opacity-100  rounded-lg w-full h-10  text-sm px-2"
        ></input>
      </label>
      <button
        type="submit"
        className="text-white bg-[#2523A8] opacity-30 rounded-lg w-2/3 h-10  text-sm px-2 mt-6"
      >
        Submit
      </button>
      <div onClick={() => router.push("/register")}>ASDASDASDADS</div>
    </form>
  );
}

export default LoginForm;
