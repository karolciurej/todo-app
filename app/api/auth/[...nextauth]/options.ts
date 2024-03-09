import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username: ", type: "email" },
        password: { label: "Password: ", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "42", email: "karol@a", surname: "zasdasd", password: "nextauth" };

        if (credentials?.email === user.email && credentials?.password === user.password) 
          return user;
        throw new Error("Invalid credentials");

      },
    }),
  ],
  callbacks: {
    // async session({ session, user }) {
    //   session.user = user;
    //   return session;
    // },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 2,
  },
  pages: {
    signIn: "/signin",
  },
};
