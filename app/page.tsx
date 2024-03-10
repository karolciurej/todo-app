"use client";
import { useSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // const { data: session } = useSession({
  //   required: true,
  //   // onUnauthenticated() {
  //   //   redirect("/login");
  //   // },
  // });
  // console.log(session);

  return <>{<div onClick={() => signOut()}>main</div>}</>;
}
