"use client";

import { Search } from "lucide-react";
import { MoviesDataType } from "./AdminPage/Movies/MoviesLists";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export interface UserData {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export type DashboardPropType = {
  username: string;
  movies: MoviesDataType[];
};

const DashboardPage = ({ username, movies }: DashboardPropType) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="min-h-screen flex flex-col gap-y-3 w-full">
      <h2 className="text-xl md:text-2xl font-semibold">
        Welcome <span className="text-primary">{username}</span>{" "}
        <span className="">👋</span>
      </h2>
      <div className="grid gap-2">
        <Label className="text-md md:text-xl font-medium " htmlFor="movie">
          Search for Movies
        </Label>
        <div className="flex items-center justify-between">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            id="movie"
            type="search"
            placeholder="Search for movies..."
          />
          <Search className="relative right-10 stroke-gray-400" />
        </div>
      </div>
      <h2 className="text-md md:text-xl font-semibold uppercase my-4">
        Currently showing movies
      </h2>
      <div className="grid gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl-grid-cols-7">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase()),
          )
          .map((movie) => {
            return (
              <Link
                href={`/movies/${movie.id}?date=${moment().format("YYYY-MM-DD")}`}
                key={movie.id}
                className="grid gap-y-2"
              >
                <Image
                  src={movie.poster}
                  width={300}
                  height={300}
                  alt={movie.title}
                />
                <h2 className="text-md md:text-xl font-medium">
                  {movie.title}
                </h2>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
