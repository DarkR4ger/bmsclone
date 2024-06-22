'use server'
import { BookingActionReturnProp } from "@/actions/booking"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const deleteBooking = async (data: FormData): Promise<BookingActionReturnProp> => {

  const showId = data.get('showId') as string
  const bookingId = data.get('bookingId') as string
  const seats = JSON.parse(data.get('seats') as string)

  try {
    const sh = await prisma.show.findFirst({
      where: {
        id: showId
      }
    })
    if (!sh) {
      await prisma.booking.deleteMany({
        where: {
          showId: showId
        }
      })
      return {
        success: false,
        message: "show does not exists"
      }
    }
    const remaningSeats = sh.bookedSeats.filter((bseats) => !seats.includes(bseats))

    await prisma.show.update({
      where: {
        id: showId
      },
      data: {
        bookedSeats: remaningSeats
      }
    })
    await prisma.booking.delete({
      where: {
        id: bookingId
      }
    })
    revalidatePath('/profile')
    return {
      success: true,
      message: 'Deleted the booking'
    }
  }
  catch (err) {
    return {
      success: false,
      message: (err as Error).message
    }
  }

}
