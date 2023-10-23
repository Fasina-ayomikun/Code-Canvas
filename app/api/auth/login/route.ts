import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";
export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();
  try {
    await connectToDB();

    if (!email || !password) {
      return new Response("Please provide all credentials", { status: 400 });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return new Response("User not registered", { status: 403 });
    }
    if (userExists?.loggedInWithPassword) {
      const comparePassword = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!comparePassword) {
        return new Response("Incorrect Password", { status: 400 });
      }
    } else {
      return new Response(
        "Seems this user registered using google or github, kindly login using the same method",
        { status: 400 }
      );
    }
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    let verifiedUser = {};
    if (token?.value) {
      verifiedUser = jwt.verify(token?.value, "JWT_SECRET");

      if (!verifiedUser) {
        return new Response("Unauthenticated user", { status: 403 });
      }
    } else {
      return new Response("Unauthenticated user", { status: 403 });
    }

    return new Response(JSON.stringify(verifiedUser));
  } catch (error) {}
  return new Response("Failed to log in", { status: 500 });
};
