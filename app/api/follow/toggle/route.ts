import Follow from "@/app/models/follow";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { followerId, followingId } = await req.json();

    try {
        await connectToDB();

        const isFollowing = await Follow.findOne({ followerId, followingId });

        if (isFollowing) {
            await Follow.deleteOne({ followerId, followingId });

            return NextResponse.json("User unfollowed successfully", { status: 200 });
        }

        const data = await Follow.create({ followerId, followingId });

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json((error as Error).message, { status: 400 })
    }
}