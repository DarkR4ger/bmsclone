'use server'

import prisma from "@/lib/prisma"

type BookingActionProp = {
  email: string;
  showId: string;
  seats: number[];
  transactionId: string;
}

export type BookingActionReturnProp = {
  success: boolean;
  message: string;
}

export const booking = async (data: BookingActionProp): Promise<BookingActionReturnProp> => {

  function containsAny(seletedSeats: number[], bookedSeats: number[]){
    return seletedSeats.some(seat => bookedSeats.includes(seat))

  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (!user) {
      return {
        success: false,
        message: 'User is not available'
      }
    }
    const oldBooking = await prisma.booking.findFirst({
      where: {
        transactionId: data.transactionId
      }
    })
    if(oldBooking){
      return {
        success: false,
        message: 'Already booked'
      }
    }
    const newBooking = await prisma.booking.create({
      data: {
        showId: data.showId,
        userId: user.id,
        seats: data.seats,
        transactionId: data.transactionId
      }
    })

    const show = await prisma.show.findFirst({
      where: {
        id: data.showId
      }
    })
    if (!show) {
      return {
        success: false,
        message: 'Show id wrong'
      }
    }
    const seletedSeats = data.seats
    const bookedSeats = show.bookedSeats
    if(containsAny(seletedSeats,bookedSeats)){
      return {
        success: false,
        message: 'Seat already booked'
      }

    }

    await prisma.show.update({
      where: {
        id: data.showId
      },
      data: {
        bookedSeats: [...show?.bookedSeats, ...data.seats]
      }
    })

    return {
      success: true,
      message: 'Successfully Booked the seats'
    }
  }
  catch (err) {
    return {
      success: false,
      message: (err as Error).message
    }
  }



}
