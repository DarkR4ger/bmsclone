import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id : string}}){
  const id = params.id
  try {
    const movie = await prisma.movie.findFirst({
      where: {
        Show: {
          
        }
      }
    })

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
