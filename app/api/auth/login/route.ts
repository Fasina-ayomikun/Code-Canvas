import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();
  try {
    await connectToDB();

    if (!email || !password) {
      return NextResponse.json("Please provide all credentials", { status: 400 });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json("User not registered", { status: 403 });
    }
    if (userExists?.loggedInWithPassword) {
      const comparePassword = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!comparePassword) {
        return NextResponse.json("Incorrect Password", { status: 400 });
      }
    } else {
      return NextResponse.json(
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
        return NextResponse.json("Unauthenticated user", { status: 403 });
      }
    } else {
      return NextResponse.json("Unauthenticated user", { status: 403 });
    }

    return NextResponse.json(verifiedUser);
  } catch (error) {
    console.log(error);
  }
};
