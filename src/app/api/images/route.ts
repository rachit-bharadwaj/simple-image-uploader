import { type NextRequest, NextResponse } from "next/server";

import connectDB from "../../../../database/connection/mongoose";
import Image from "../../../../database/models/Image.schema";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { image } = reqBody;

    // Create new image
    const newImage = new Image({
      image,
    });

    // Save image to database
    await newImage.save();

    return NextResponse.json({
      status: 201,
      message: "Image uploaded!",
      newImage,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectDB();

    const images = await Image.find({});

    return NextResponse.json({
      status: 200,
      images,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
