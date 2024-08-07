import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import config from "@/config";
import { getSuperHero } from "./lib/utils";
import { prisma } from "./db/prisma";

export const providers = [
  GoogleProvider({
    clientId: config.googleClientId,
    clientSecret: config.googleClientSecret,
  }),
  GithubProvider({
    clientId: config.githubClientId,
    clientSecret: config.githubClientSecret,
  }),
  Credentials({
    id: "credentials",
    name: "Credentials",
    credentials: {
      name: { type: "text", label: "Name", placeholder: "ManojK" },
      email: {
        type: "email",
        label: "Email",
        required: true,
        placeholder: "example@gmail.com",
      },
      password: { type: "passwrod", label: "Password", required: true },
    },
    authorize: async ({ email, password, name }) => {
      try {
        let user = null;
        if (!email) {
          throw new Error("Email and password are required.");
        }
        user = await prisma.users.findFirst({ where: { email } });
        if (user && !user.password) return null;
        if (!user) {
          // get random superhero name
          const superheroName = getSuperHero();
          const salt = await bcryptjs.genSalt(8);
          const hashPassword = await bcryptjs.hash(password, salt);
          const getName = name ? name : superheroName;
          user = await prisma.users.create({
            data: {
              email,
              password: hashPassword,
              name: getName,
              image: `https://api.multiavatar.com/${getName}.svg`,
            },
          });
          return user;
        }

        const isPasswordCorrect = await bcryptjs.compare(
          password,
          user.password,
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid password.");
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.image = user.image;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.image;
      }
      return session;
    },
  },
});
