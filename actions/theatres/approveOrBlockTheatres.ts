'use server'

import prisma from "@/lib/prisma"
import { FormState } from "./addTheatre"
import { revalidatePath } from "next/cache"


export const approveOrBlockTheatres = async(prevState: FormState, formData: FormData) => {
  const theatreId = formData.get('theatreId') as string
  const activeData = formData.get('isActive') as string
  const isActive = (activeData == 'true');

  try {
    const res = await prisma.theatre.update({
      where: {
        id: theatreId
      },
      data: {
        isActive: !isActive
      }
    })
    if(!res){
      return{
        success: false,
        message: 'Something wrong happend'
      }
    }
    revalidatePath('/admin')
    return{
        success: true,
        message: 'Theatre Action updated'

    }
  }
  catch(err) {
    return{
        success: true,
        message: "Something bad happened"
    }
  }

}
