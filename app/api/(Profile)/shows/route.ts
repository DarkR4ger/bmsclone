import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req:NextRequest) {
  const body = await req.json();
  
  try {
    const shows = await prisma.show.findMany({
      where: {
        theatreId:  body.id
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
