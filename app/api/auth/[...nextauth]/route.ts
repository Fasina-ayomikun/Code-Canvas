import NextAuth, { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/user";

import bcrypt from "bcryptjs";
// import CredentialsProviders from "next-auth/Credentialsproviders/credentials";
import { connectToDB } from "@/utils/connect";

type UserType = {
  id: number;
  name: string;
  email: string;
};

type CredentialsType = {
  email: string;
  password: string;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        await connectToDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user.loggedInWithPassword) {
          return null;
        } else {
          const comparePassword = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );
          if (!comparePassword) {
            return null;
          }
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],
  session: { maxAge: 60 * 60 * 24 * 7 },
  callbacks: {
    //TODO:Change type any to other type
    async session({ session }: any) {
      console.log("session", session);
      const sessionUser = await User.findOne({
        email: session?.user.email,
      });
      session.user.id = sessionUser?._id.toString();

      return {
        ...session.user,
        expires: session?.expires,
        username: sessionUser.username,
        bio: sessionUser.bio,
        tags: sessionUser.tags,
        bannerImage: sessionUser.bannerImage,
      };
    },
    //TODO: When deleting account redirect to login page
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return `${baseUrl}/feed`;
    },
    //TODO:Change type any to other type
    async signIn({ profile }: any) {
      console.log("profile", profile);
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          await User.create({
            email: profile?.email,
            name: profile?.name,
            username: profile?.name.replace(" ", "").toLowerCase(),
            loggedInWithPassword: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
      return true;
    },
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
