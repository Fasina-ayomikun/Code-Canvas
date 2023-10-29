import Likes from "@/app/models/likes";
import { connectToDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import Post from "@/app/models/post";

export const POST = async (req: Request) => {
    const { postId, userId } = await req.json();

    try {
        await connectToDB();

        const userAlreadyLiked = await Likes.findOne({ postId, userId });
        const post = await Post.findOne({ _id: postId });

        // check if the user already liked the post, then remove the like by deleting the document.
        if (userAlreadyLiked) {
            await Likes.deleteOne({ postId, userId });
            post.noOfLikes--;
            post.likesUser.splice(post.likesUser.indexOf(userId), 1);
            await post.save();
            return NextResponse.json("Like removed successfully", { status: 200 });
        }

        // continue to like the post if the user hasn't liked it yet.
        const data = await Likes.create({ postId, userId });
        post.noOfLikes++;
        post.likesUser.push(userId);
        await post.save();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 400 });
    }
}