import Comments from "@/app/models/comments";
import Post from "@/app/models/post";
import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { desc, post, creator } = await req.json();
  console.log(creator, post);

  try {
    await connectToDB();
    const creatorExists = await User.findById(creator);
    if (!creatorExists) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
    const postExists = await Post.findById(post);
    if (!postExists) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    if (!desc) {
      return NextResponse.json(
        { message: "Please provide comment" },
        { status: 400 }
      );
    }
    const newComments = await Comments.create({ desc, creator, post });

    return NextResponse.json(
      { message: "Comment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create a new comment" },
      { status: 500 }
    );
  }
};
