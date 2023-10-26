import Post from "@/app/models/post";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: {params: { userId: string }}) => {
    await connectToDB();
  
    try {
      const posts = await Post.find({user: params.userId});
      return NextResponse.json(posts, { status: 200 })
    } catch (error) {
      console.log(error);
      return NextResponse.json(error, { status: 500 })
    }
  
}