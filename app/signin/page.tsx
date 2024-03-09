"use client";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";

function SignIn() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("123");
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (!res?.error) {
      console.log(res);
      router.push("/");
    }
    console.log(res);
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
