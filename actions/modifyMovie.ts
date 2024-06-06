"use server"

import { MovieDataType } from "./addMovie";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const modifyMovie = async(movieId:string, formData: FormData) => {
  const movieData: MovieDataType = {
    title : formData.get('movie-name') as string,
    description: formData.get('movie-description') as string,
    genre: formData.get('movie-genre') as string,
    language: formData.get('movie-language') as string,
    releaseDate: formData.get('movie-release-date') as string,
    poster: formData.get("movie-poster-url") as string,
    duration: parseInt(formData.get("movie-duration") as string)
  }
  await prisma.movie.update({
    where: {
      id: movieId,
    },
    data: {
      ...movieData
    }
  })
  revalidatePath('/admin')
}
