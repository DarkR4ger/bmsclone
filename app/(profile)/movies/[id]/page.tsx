import MovieDashboard from "@/components/MoviePage/MoviesDashboard";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { resolve } from "path";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await prisma.movie.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!movie) {
    redirect("/");
  }

  return (
    <div>
      <MovieDashboard
        title={movie.title}
        description={movie.description}
        language={movie.language}
        genre={movie.genre}
        releaseDate={movie.releaseDate}
        duration={movie.duration}
        poster={movie.poster}
        id={params.id}
      />
    </div>
  );
}
