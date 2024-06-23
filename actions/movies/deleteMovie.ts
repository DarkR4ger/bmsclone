"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteMovie = async(movieId:string) => {
  const deleteBookings = prisma.booking.deleteMany({
    where: {
      show: {
        movieId: movieId
      }
    }
  })
  const deleteShows = prisma.show.deleteMany({
    where: {
      movieId: movieId
    }
  })
  const deleteMovie =  prisma.movie.delete({
    where: {
      id: movieId
    }
  })

  await prisma.$transaction([deleteBookings,deleteShows, deleteMovie])

  revalidatePath('/admin')
}
