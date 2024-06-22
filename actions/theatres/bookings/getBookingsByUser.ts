'use server'
import { FullShowsDataType } from "@/app/(profile)/bookshow/[id]/page"
import { UserData } from "@/components/DashboardPage"
import prisma from "@/lib/prisma"
import { Booking } from "@prisma/client/edge"

export type GetBookingActionProp = {
  success: boolean
  message: string;
  data?: PopulatedDataType[]
}

export type PopulatedDataType = Booking & {
  show: FullShowsDataType,
  user: UserData
}


export const getBookingByUser = async (userId: string): Promise<GetBookingActionProp> => {

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId
      },
      include: {
        show: {
          include: {
            movie: true,
            theatre: true
          }
        },
        user: true
      },

    })
    type DataType = typeof bookings

    return {
      success: true,
      message: 'Data retrieved',
      data: bookings as DataType
    }
  } catch (err) {
    return {
      success: false,
      message: (err as Error).message
    }


  }

}

