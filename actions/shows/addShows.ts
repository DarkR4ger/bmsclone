"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormState } from "../theatres/addTheatre";

export type ShowType = {
  name: string;
  date: string;
  time: string;
  movieId: string;
  ticketPrice: number;
  totalSeats: number;
  theatreId: string;
};
export const addShows = async (prevState: FormState, formData: FormData) => {

  const showFormData: ShowType = {
    name: formData.get("showName") as string,
    date: formData.get("showDate") as string,
    time: formData.get("time") as string,
    movieId: formData.get('movieId') as string,
    ticketPrice: parseInt(formData.get("ticketPrice") as string),
    totalSeats: parseInt(formData.get("totalSeats") as string),
    theatreId: formData.get("theatreId") as string,
  };

  try {
    const res = await prisma.show.create({
      data: {
        ...showFormData,
      },
    });
    console.log(res)
    if (!res) {
      return {
        success: false,
        message: "data is incorrect, please check",
      };
    }
    revalidatePath("/profile");
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
