import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const POST = async (req: Request) => {
  const { path } = await req.json();
  if (!path) {
    return NextResponse.json(
      { message: "Please provide an image path" },
      { status: 400 }
    );
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };
    const result = await cloudinary.uploader.upload(path, options);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to upload image to cloudinary" },
      { status: 500 }
    );
  }
};
