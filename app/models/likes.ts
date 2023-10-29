import { model, models, Schema } from "mongoose";

const likeSchema = new Schema({
    postId: {
        type: String,
    },
    userId: {
        type: String
    }
});

export default models.Like || model("Like", likeSchema);