"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  return <>{<div onClick={() => signOut()}>dashboard 1145</div>}</>;
}
