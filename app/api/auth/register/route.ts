import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { name, username, loggedInWithPassword, email, password } =
    await req.json();
  try {
    await connectToDB();
    console.log(loggedInWithPassword);
    if (!name || !username || !email) {
      return new Response("Please provide all credentials", { status: 400 });
    }
    if (loggedInWithPassword && !password) {
      return new Response("Please provide a password", { status: 400 });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response("User already exists", { status: 400 });
    }
    let hashedPassword = "";
    if (password && loggedInWithPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    const token = jwt.sign({ email, username }, "JWT_SECRET", {
      expiresIn: "30d",
    });
    const cookie = serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      secure: process.env.NODE_ENV != "development",
    });
    if (loggedInWithPassword) {
      await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        loggedInWithPassword,
      });
    } else {
      await User.create({ name, email, username, loggedInWithPassword });
    }
    return NextResponse.json("User successfully created", {
      status: 201,
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};
