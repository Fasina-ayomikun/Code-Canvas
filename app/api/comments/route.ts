import Comments from "@/app/models/comments";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { creator, post } = await req.json();
  try {
    await connectToDB();
    console.log("creator", creator);
    console.log("post", post);

    const comments = await Comments.find({ creator, post })
      .populate({
        path: "creator",
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch all comments" },
      { status: 500 }
    );
  }
};
