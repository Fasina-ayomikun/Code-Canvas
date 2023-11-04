import Follow from "@/app/models/follow";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string, followingId: string }}) {
    const { id, followingId } = params;

    try {
        await connectToDB();

        const isFollowing = await Follow.findOne({ followerId: id, followingId });
        
        return NextResponse.json(isFollowing, { status: 200 });

    } catch (error) {
        return NextResponse.json((<Error>error).message, { status: 400 });
    }
}