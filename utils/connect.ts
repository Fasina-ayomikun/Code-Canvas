import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  if (isConnected) {
    console.log("Mongo is already connected");
    return;
  }
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log("Mongo Connected");
    }
  } catch (error) {
    console.log(error);
  }
};
