"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteMovie = async(movieId:string) => {

  await prisma.movie.delete({
    where: {
      id: movieId
    }
  })
  revalidatePath('/admin')
}
