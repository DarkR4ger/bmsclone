
"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteTheatre = async(theatreId:string) => {
  await prisma.theatre.delete({
    where: {
      id: theatreId
    }
  })
  revalidatePath('/profile')
}
