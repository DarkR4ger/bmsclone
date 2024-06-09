"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteShow = async(showId: string) => {
  await prisma.show.delete({
    where:{
      id: showId
    }
  })
  revalidatePath('/profile')
}
