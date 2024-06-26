import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req:NextRequest) {
  
  try {
    const shows = await prisma.show.findMany({
      //where: {
      //  theatreId: id 
      //}
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
