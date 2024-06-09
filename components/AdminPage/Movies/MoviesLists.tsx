import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import  DialogBox  from "./DialogBox";
import prisma from "@/lib/prisma";
import { MovieDataType } from "@/actions/movies/addMovie";
import Image from "next/image";
import ModifyMovie from "./ModifyMovies";
import DeleteMovies from "./DeleteMovies";

export type MoviesDataType = MovieDataType & {
  id: string;
};

export default async function MoviesLists() {
  const moviesData: MoviesDataType[] = await prisma.movie.findMany();

  return (
    <section className="flex flex-col justify-center gap-y-5 mt-5">
      <DialogBox />
      <Table>
        <TableCaption>Movies Lists</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead itemType="string" className="">
              Poster
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="">Duration (min)</TableHead>
            <TableHead className="">Genre</TableHead>
            <TableHead className="">Languae</TableHead>
            <TableHead className="">Release Data</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moviesData.map((movies) => {
            return (
              <TableRow key={movies.id}>
                <TableCell className="w-40">
                  <Image
                    className=""
                    src={movies.poster}
                    width={100}
                    height={100}
                    alt={movies.title}
                  />
                </TableCell>
                <TableCell className="text-left font-medium text-xl uppercase">
                  {movies.title}
                </TableCell>
                <TableCell className="w-80">{movies.description}</TableCell>
                <TableCell className="text-center">{movies.duration}</TableCell>
                <TableCell className="capitalize">{movies.genre}</TableCell>
                <TableCell className="capitalize">{movies.language}</TableCell>
                <TableCell className="">{movies.releaseDate}</TableCell>
                <TableCell className="">
                  <ModifyMovie
                    id={movies.id}
                    title={movies.title}
                    description={movies.description}
                    duration={movies.duration}
                    genre={movies.genre}
                    language={movies.language}
                    releaseDate={movies.releaseDate}
                    poster={movies.poster}
                  />
                  <DeleteMovies id={movies.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </section>
  );
}
