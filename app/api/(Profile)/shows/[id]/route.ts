import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id : string}}){
  const id = params.id
  try {
    const shows = await prisma.show.findMany({
      where: {
        theatreId: id 
      },
      include: {
        movie: true
      }
    })

    if(!shows) {
      return NextResponse.json({
        success: false,
        message: 'Something wrong happened, please try again'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Data retrieved',
      data: shows
    })
  }
  catch (err) {
    return NextResponse.json({
      success: false,
      message: 'Something bad happened, please try again'
    })
  }
}
