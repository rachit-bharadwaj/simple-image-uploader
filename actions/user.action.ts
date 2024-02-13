"use server";

import { getCookieData } from "./auth.action";
import User from "../database/models/User.schema";
import connectDB from "../database/connection/mongoose";

export const getUserDataFromCookie = async () => {
  await connectDB();
  const userID: string = await getCookieData();
  const userData = await User.findById(userID);

  return userData;
};
