import { type NextRequest, NextResponse } from "next/server";

import * as bcrypt from "bcryptjs";
import connectDB from "../../../../../database/connection/mongoose";
import User from "../../../../../database/models/User.schema";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        status: 403,
        message: "The email is already registered",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Return response
    return NextResponse.json({
      status: 201,
      message: "Registration successful!",
      newUser,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
