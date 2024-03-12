import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const data = await req.json();
  if (req.method != "POST") return new Response("Method not allowed", { status: 405 });
  if (!data) return new Response("No data provided", { status: 404 });
  const checkexisting = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (checkexisting) return new Response("User already exists", { status: 422 });
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    },
  });

  return new Response(JSON.stringify(user), { status: 200 });
}
