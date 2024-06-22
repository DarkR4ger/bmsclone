"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MoviesDataType } from "../AdminPage/Movies/MoviesLists";
import { Input } from "../ui/input";
import moment from "moment";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { UniqueTheatresType } from "@/app/api/(Profile)/theatre/route";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function MovieDashboard({
  title,
  description,
  language,
  genre,
  releaseDate,
  duration,
  poster,
  id,
}: MoviesDataType) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date")!;
  const router = useRouter();
  const [theatres, setTheatres] = useState<UniqueTheatresType[]>();
  const [queryDate, setQueryDate] = useState(date.toString());
  const [queryData, setQueryData] = useState({
    movieId: id,
    date: queryDate,
  });

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const optDate = e.target.value;
    setQueryDate(optDate);
    setQueryData({ movieId: id, date: optDate });
    router.push(`/movies/${id}?date=${optDate}`);
  };

  const getData = async () => {
    const res = await fetch("/api/theatre", {
      method: "POST",
      body: JSON.stringify(queryData),
    });
    const data = await res.json();
    setTheatres(data.body);
  };

  useEffect(() => {
    getData();
  }, [queryDate]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Image src={poster} alt={title} width={300} height={300} />
          <div className="flex flex-col md:gap-y-4 md:self-end">
            <h1 className="text-md md:text-2xl uppercase">
              Title: <span className="text-primary font-semibold">{title}</span>
            </h1>
            <h1 className="text-md md:text-2xl uppercase">
              Duration:{" "}
              <span className="text-primary font-semibold">
                {duration} mins
              </span>
            </h1>
            <h1 className="text-md md:text-2xl uppercase">
              Relase Date:{" "}
              <span className="text-primary font-semibold">
                {moment(releaseDate).format("MMM Do YYYY")}
              </span>
            </h1>
            <h1 className="text-md md:text-2xl uppercase">
              Genre: <span className="text-primary font-semibold">{genre}</span>
            </h1>
            <h1 className="text-md md:text-2xl uppercase">
              Language:{" "}
              <span className="text-primary font-semibold">{language}</span>
            </h1>
            <h1 className="text-md ">
              Description:{" "}
              <span className="text-primary font-semibold">{description}</span>
            </h1>
          </div>
        </div>
        <div className="self-start">
          <Label htmlFor="date">Select a Date</Label>
          <Input
            id="date"
            type="date"
            min={moment().format("YYYY-MM-DD")}
            value={date?.toString()}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <Separator className="m-6" />
      <section>
        <h2 className="text-2xl font-semibold md:text-4xl">Theatres lists</h2>
        {theatres?.length === 0 ? (
          <div className="font-medium text-center">
            No shows added at this date
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-y-4">
            {theatres?.map((theatre) => {
              return (
                <Card key={theatre.id} className="w-full px-2">
                  <CardHeader>
                    <CardTitle>{theatre.name}</CardTitle>
                    <CardDescription>{theatre.address}</CardDescription>
                  </CardHeader>
                  <Separator className="mb-4" />
                  <CardContent className="flex gap-2">
                    {theatre.shows
                      .sort(
                        (a, b) =>
                          moment(a.time, "HH:mm") - moment(b.time, "HH:mm"),
                      )
                      .map((show) => (
                        <Link
                          key={show.id}
                          href={`/bookshow/${show.id}`}
                          className={buttonVariants({ variant: "outline" })}
                        >
                          {moment(show.time, "HH:mm").format("hh:mm A")}
                        </Link>
                      ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
