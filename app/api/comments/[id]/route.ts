import Comments from "@/app/models/comments";
import Post from "@/app/models/post";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const commentExist = await Comments.findById(params.id);
    if (!commentExist) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 400 }
      );
    }
    await Comments.deleteOne({ _id: params.id });
    return NextResponse.json(
      { message: "Comment successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete Comment" },
      { status: 500 }
    );
  }
};
