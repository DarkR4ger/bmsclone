"use server";

import { getDataFromHeader } from "@/lib/headerdData";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type TheaterType = {
  name: string;
  address: string;
  phone: number;
  email: string;
  userId: string;
};

export type FormState = {
  success: boolean;
  message: string;
};

export const addTheatre = async ( prevState: FormState, formData: FormData ) => {

  const user = await getDataFromHeader();
  
  const theatreData: TheaterType = {
    name: formData.get("theatreName") as string,
    address: formData.get("address") as string,
    phone: parseInt(formData.get("phonenumber") as string),
    email: formData.get("email") as string,
    userId: user.id
  };

  try {
    const res = await prisma.theatre.create({
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
      message: "added theatre",
    };
  } catch (err) {
    return {
      success: false,
      message: "something wrong happened",
    };
  }
};
