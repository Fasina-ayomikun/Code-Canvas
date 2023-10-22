import User from "@/app/models/user";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { image, bannerImage, bio, tags } = await req.json();
  try {
    const existingUser = await User.findById(params?.id);
    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 403 }
      );
    }
    existingUser.image = image;
    existingUser.bannerImage = bannerImage;
    existingUser.bio = bio;
    existingUser.tags = tags;
    await existingUser.save();
    return NextResponse.json(
      { message: "Profile successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
};
