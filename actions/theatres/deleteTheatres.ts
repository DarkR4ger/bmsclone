
"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteTheatre = async(theatreId:string) => {
  const deleteShows = prisma.show.deleteMany({
    where: {
      theatreId: theatreId
    }
  })
  const deleteTheatre = prisma.theatre.delete({
    where: {
      id: theatreId
    }
  })

  await prisma.$transaction([deleteShows, deleteTheatre])
  revalidatePath('/profile')
}
