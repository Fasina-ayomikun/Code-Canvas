import Follow from "@/app/models/follow";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    
    const { id } = params;

    try {
        await connectToDB();

        const follower = await Follow.find({ followingId: id });
        const following = await Follow.find({ followerId: id });

        return NextResponse.json({ follower, following }, { status: 200 })
    } catch (error) {
        return NextResponse.json((<Error>error).message);
    }
}
