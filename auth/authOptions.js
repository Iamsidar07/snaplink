import UserModel from "@/models/User";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { getSuperHero } from "@/lib/utils";
import dbConnect from "@/db";
import config from "@/config";

export const authOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    Credentials({
      id: "crendentials",
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
        await dbConnect();
        try {
          let user = null;
          if (!email || !password) {
            throw new Error("Email and password are required.");
          }
          user = await UserModel.findOne({ email });
          if (!user) {
            // get random superhero name
            const superheroName = getSuperHero();
            // create new user
            // hash password
            const salt = await bcryptjs.genSalt(8);
            const hashPassword = await bcryptjs.hash(password, salt);
            const getName = name ? name : superheroName;
            user = await UserModel.create({
              email,
              password: hashPassword,
              name: getName,
              image: `https://api.multiavatar.com/${getName}.svg`,
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
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id?.toString();
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
};
