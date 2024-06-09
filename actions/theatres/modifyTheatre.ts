'use server'

import { FormState } from "./addTheatre";
import { TheaterType } from "./addTheatre";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const modifyTheatre = async ( prevState: FormState, formData: FormData ) => {

  const theatreData: TheaterType = {
    name: formData.get("theatreName") as string,
    address: formData.get("address") as string,
    phone: parseInt(formData.get("phonenumber") as string),
    email: formData.get("email") as string,
    userId: formData.get("userId") as string
  };
  const theatreId = formData.get('theatreId') as string

  try {
    const res = await prisma.theatre.update({
      where: {
        id: theatreId,
      },
      data: {
        ...theatreData,
      },
    });
    if (!res) {
      return {
        success: false,
        message: "data is incorrect, please check",
      };
    }
    revalidatePath('/profile')
    return {
      success: true,
      message: "modified theatre details",
    };
  } catch (err) {
    return {
      success: false,
      message: "something wrong happened",
    };
  }
};
