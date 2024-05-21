"use server";
import { cookies } from "next/headers";
import prisma from "./prisma";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const { SECRET_KEY } = process.env;

interface AuthenticationRespone {
  success: boolean;
  data?: {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

interface DecodedData {
  userId: string;
  emailId: string;
}

export default async function Authentication(): Promise<AuthenticationRespone> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return {
      success: false,
      data: { id: "", username: "", email: "", isAdmin: false },
    };
  }
  // const decoded = jwt.verify(token, SECRET_KEY) as DecodedData;
  const {payload}  = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
  const decoded = payload as unknown as DecodedData

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: false,
      isAdmin: true,
    },
  });

  if (!user) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: user,
  };
}

export async function sign(
  payload: DecodedData,
  secret: string,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({
      alg: "HS256",
      // typ: "JWT",
    })
    .setExpirationTime("1d")
    .setIssuedAt()
    .sign(new TextEncoder().encode(secret))
}
