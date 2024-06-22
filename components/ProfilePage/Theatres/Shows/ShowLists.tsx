"use client";
import { useEffect, useState } from "react";
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
import { ShowType } from "@/actions/shows/addShows";
import { toast } from "sonner";
import { MovieDataType } from "@/actions/movies/addMovie";
import DeleteShow from "./DeleteShow";
import { useAppDispatch, useAppSelector } from "@/lib/reduxhook";
import { setLoading } from "@/redux/loadingSlice";
import LoaderSpinner from "@/components/LoaderSpinner";

export type ShowDataType = ShowType & {
  id: string;
  movie: MovieDataType;
  bookedSeats: Number[];
};

export default function ShowLists({ id }: { id: string }) {
  const [showsData, setShowsData] = useState<ShowDataType[]>([]);
  const isLoading = useAppSelector((state) => state.loading.loading)
  const dispatch = useAppDispatch()
  const getShows = async () => {
    dispatch(setLoading(true))
    try {
      const res = await fetch(`api/shows/${id}`);
      const data = await res.json();
      const showsDatas: ShowDataType[] = data.data;
      setShowsData(showsDatas);
      dispatch(setLoading(false))
    } catch (err) {
      toast.error("Something wrong happened");
      dispatch(setLoading(false))
    }
  };
  console.log(showsData);

  useEffect(() => {
    getShows();
  });

  return (
    <section className="flex flex-col justify-center gap-y-5 mt-5">
      {!isLoading ? (
      <Table>
        <TableCaption>Show Lists</TableCaption>
        <TableHeader>
          <TableRow className="sm:text-sm md:text-md">
            <TableHead>Show Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="">Time</TableHead>
            <TableHead className="">Movie</TableHead>
            <TableHead className="">Ticket Price</TableHead>
            <TableHead className="">Total Seats</TableHead>
            <TableHead className="">Available Seats</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showsData.map((show) => {
            return (
              <TableRow key={show.id}>
                <TableCell>{show.name}</TableCell>
                <TableCell>{show.date}</TableCell>
                <TableCell>{show.time}</TableCell>
                <TableCell>{show.movie.title}</TableCell>
                <TableCell>{show.ticketPrice}</TableCell>
                <TableCell>{show.totalSeats}</TableCell>
                <TableCell>
                  {show.totalSeats - show.bookedSeats.length}
                </TableCell>
                <TableCell>
                  <DeleteShow id={show.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      ): (
        <LoaderSpinner />
      )}
    </section>
  );
}
