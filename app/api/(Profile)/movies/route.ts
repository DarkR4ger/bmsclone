import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const movie = await prisma.movie.findMany()

    if(!movie) {
      return NextResponse.json({
        success: false,
        message: 'Something wrong happened, please try again'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Data retrieved',
      data: movie
    })
  }
  catch (err) {
    return NextResponse.json({
      success: false,
      message: 'Something bad happened, please try again'
    })
  }
  
}
