import User from "@/app/models/user";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const randomUsers = await User.aggregate([
      { $sample: { size: 5 } },
      { $project: { _id: 1, name: 1, username: 1, bio: 1, tags: 1, image: 1 } },
    ]);

    return NextResponse.json({ users: randomUsers }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch all post" },
      { status: 500 }
    );
  }
};
