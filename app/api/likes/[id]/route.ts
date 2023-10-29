import { NextResponse } from "next/server";
import Likes from "@/app/models/likes";
import { connectToDB } from "@/utils/connect";

// FILE NOT IN USE ATM.

export const GET = async (req: Request, { params }: { params: { id: string }}) => {
    try {
        await connectToDB();

        const likes = await Likes.find({ postId: params.id });

        return NextResponse.json(likes, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 400 })
    }
}