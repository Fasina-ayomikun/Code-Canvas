import mongoose, { model, models } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, "Please provide post details"],
    },
    image: {
      type: String,
    },
    tags: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: {
      type: Array,
      default: [],
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
