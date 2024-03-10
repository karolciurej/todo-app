"use client";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function SignIn() {
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
    if (!res?.error) {
      router.push("/");
      return
    }
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email or password!",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="email"
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, email: target.value });
        }}
        type="email"
      ></input>
      <input
        placeholder="hasło"
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, password: target.value });
        }}
      ></input>
      <button type="submit">submit</button>
    </form>
  );
}

export default SignIn;
