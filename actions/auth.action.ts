"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  cookies().delete("token");
  redirect("/login");
};

export const getCookieData = async () => {
  const token = cookies().get("token")?.value || "";
  const tokenData: any = jwt.verify(token, process.env.JWT_SECRET!);
  return tokenData.id;
};
