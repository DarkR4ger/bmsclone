"use client";
import { Button } from "@/components/ui/button";
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

import { DialogBox } from "./DialogBox";

export default function MoviesLists() {
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
            <TableHead className="">Duration</TableHead>
            <TableHead className="">Genre</TableHead>
            <TableHead className="">Languae</TableHead>
            <TableHead className="">Release Data</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
        <TableFooter></TableFooter>
      </Table>
    </section>
  );
}

