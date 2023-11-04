import mongoose, { Schema, models, model } from "mongoose";

const followSchema = new Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default models.Follow || model("Follow", followSchema);