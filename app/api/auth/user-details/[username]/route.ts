import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { username: string } }
) => {
  await connectToDB();

  try {
    const user = await User.findOne({ username: params.username });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
