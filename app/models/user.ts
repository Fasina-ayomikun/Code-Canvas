import mongoose from "mongoose";
import { models, model } from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your full name"],
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
  },
  bio: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore sapiente sequi nesciunt quasi quae. Sint earum eaque quae molestias nobis.",
  },
  tags: {
    type: Array,

    default: ["java", "oop"],
  },

  password: {
    type: String,
  },

  //   TODO: add profile details after registering
  image: {
    type: String,
  },
  //TODO:CHANGE Default
  bannerImage: {
    type: String,
    default: "/hero2.jpg",
  },
  loggedInWithPassword: {
    type: Boolean,
    required: [true, "Please provide the login method"],
  },
});

const User = models?.User || model("User", UserSchema);
export default User;
