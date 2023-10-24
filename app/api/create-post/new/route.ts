import Post from "@/app/models/post";
import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { desc, tags, image, user } = await req.json();
  try {
    await connectToDB();
    const userExists = await User.findById(user);
    if (!userExists) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
    if (!desc) {
      return NextResponse.json(
        { message: "Please provide post details" },
        { status: 400 }
      );
    }
    const newPost = await Post.create({ desc, tags, image, user });

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new post" },
      { status: 500 }
    );
  }
};
