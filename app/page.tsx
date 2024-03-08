"use client"
import Image from "next/image";
import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api');
      // console.log(data)
      console.log('data')
      const data = await response.json();

      setUsers(data);
    }

    fetchData();
  }, []);
  return (
    <div>
      {users.map((user: any)  => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
