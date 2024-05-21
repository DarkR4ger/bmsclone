import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import prisma from "@/lib/prisma";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const formData = (await req.formData()) as unknown as Iterable<
    [RegisterData, FormDataEntryValue]
  >;
  const data: RegisterData = Object.fromEntries(formData);

  try{
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if(userExists) {
      return NextResponse.json({
        success : false,
        message: `${data.email} already exists, please login`
      },{status : 401})
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword

    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password
      }
    })

    return NextResponse.json({
      success: true,
      message: "User successfully registered, Please login"
    }, {status: 201})
  }
  catch(err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong"
    })

  }
}
