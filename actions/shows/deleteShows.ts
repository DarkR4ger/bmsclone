"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteShow = async(showId: string) => {
  const deleteBookings = prisma.booking.deleteMany({
    where: {
      show: {
        id: showId
      }
    }
  })
  const deleteShow = prisma.show.delete({
    where:{
      id: showId
    }
  })
  await prisma.$transaction([deleteBookings,deleteShow])
  revalidatePath('/profile')
}
