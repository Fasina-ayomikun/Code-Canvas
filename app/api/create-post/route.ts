import Post from "@/app/models/post";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const posts = await Post.find({})
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch all post" },
      { status: 500 }
    );
  }
};
