"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  console.log(session);

  return (
    <>
      <div>ASD</div>
    </>
  );
}
