import { type NextRequest, NextResponse } from "next/server";


import connectDB from "../../../../../database/connection/mongoose";
import User from "../../../../../database/models/User.schema";

import * as bcrypt from "bcryptjs";

import * as jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    // find user from DB
    const user = await User.findOne({ email });

    // if user not found
    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    // compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ status: 401, error: "Invalid credentials" });
    }

    //   create token data
    const tokenData = {
      id: user._id,
    };

    const firstName = user.name.split(" ")[0];

    //   create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      status: 200,
      message: `Welcome back ${firstName}!`,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: true,
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
