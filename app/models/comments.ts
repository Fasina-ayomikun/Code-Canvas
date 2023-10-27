import mongoose, { model, models } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, "Please provide post details"],
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comments = models.Comments || model("Comments", CommentSchema);
export default Comments;
