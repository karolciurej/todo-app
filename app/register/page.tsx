"use client";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Register() {
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
    // Register user
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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        className="text-black"
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, email: target.value });
        }}
      />
      <input
        type="text"
        maxLength={10}
        name="name"
        className="text-black"
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, name: target.value });
        }}
      />
      <input
        type="password"
        name="password"
        className="text-black"
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, password: target.value });
        }}
      />
      <input
        type="password"
        name="password2"
        className="text-black"
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, password2: target.value });
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default Register;
