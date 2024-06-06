"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type MovieDataType = {
  title: string;
  description: string;
  genre: string;
  language: string;
  releaseDate: string;
  poster: string;
  duration: number;
};


export const addMovie = async ( formData: FormData) => {
  const movieData: MovieDataType = {
    title: formData.get("movie-name") as string,
    description: formData.get("movie-description") as string,
    genre: formData.get("movie-genre") as string,
    language: formData.get("movie-language") as string,
    releaseDate: formData.get("movie-release-date") as string,
    poster: formData.get("movie-poster-url") as string,
    duration: parseInt(formData.get("movie-duration") as string),
  };
  try {
    const res = await prisma.movie.create({
      data: {
        ...movieData,
      },
    });
    if(!res){
      return {
        success: false,
        message: "Something went wrong, please check you parameters"
      }
    }
    revalidatePath("/admin");
    return {
      success: true,
      message: 'Movie added'
    }
  } catch (err) {
    return {
      message: err 
    }
  }
};
