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

import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import TheatreAction from "./TheatreAction";

export const revalidate = 0

export default async function AdminTheatreLists() {
  const theatreData= await prisma.theatre.findMany({
    include: {
      owner: true
    }
  });

  return (
    <section className="flex flex-col justify-center gap-y-5 mt-5">
      <Table>
        <TableCaption>Theatre Lists</TableCaption>
        <TableHeader>
          <TableRow className="sm:text-sm md:text-md">
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="">Phone</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Owner</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {theatreData.map((theatre) => {
            return (
              <TableRow key={theatre.id} className="md:text-md sm:text-sm">
                <TableCell className="capitalize">{theatre.name}</TableCell>
                <TableCell className="capitalize">{theatre.address}</TableCell>
                <TableCell className="">+91 {theatre.phone}</TableCell>
                <TableCell className="">{theatre.email}</TableCell>
                <TableCell className="capitalize">
                  {theatre.owner.username}
                </TableCell>
                <TableCell className="">
                  <p
                    className={cn(
                      " w-fit px-3 py-1 capitalize rounded-full",
                      theatre.isActive
                        ? "bg-green-300 text-green-900 "
                        : "bg-red-300 text-red-900",
                    )}
                  >
                    {theatre.isActive ? "Accepted" : "Pending"}
                  </p>
                </TableCell>
                <TableCell>
                  <TheatreAction isActive={theatre.isActive} theatreId={theatre.id} />
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
