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
import { ShowType } from "@/actions/addShows";
import { toast } from "sonner";

export type ShowDataType = ShowType & {
  id: string;
};

export default function ShowLists({ id }: { id: string }) {
  const [showsData, setShowsData] = useState<ShowDataType[]>([]);
  const getShows = async () => {
    try {
      const res = await fetch("api/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      const data = await res.json();
      const showsDatas: ShowDataType[] = data.data;
      setShowsData(showsDatas);
    } catch (err) {
      toast.error("Something wrong happened");
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <section className="flex flex-col justify-center gap-y-5 mt-5">
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
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </section>
  );
}
