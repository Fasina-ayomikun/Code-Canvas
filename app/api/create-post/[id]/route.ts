import Post from "@/app/models/post";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate({
      path: "user",
    });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get post" },
      { status: 500 }
    );
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { desc, tags, image, liked } = await req.json();
  try {
    await connectToDB();
    const postExists = await Post.findById(params.id);
    if (!postExists) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    postExists.desc = desc;
    postExists.tags = tags;
    postExists.image = image;
    if (liked) {
      postExists.noOfLikes += 1;
    }
    await postExists.save();
    return NextResponse.json(
      { message: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const postExist = await Post.findById(params.id);
    if (!postExist) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
    await Post.deleteOne({ _id: params.id });
    return NextResponse.json(
      { message: "Post successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete Post" },
      { status: 500 }
    );
  }
};
