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

import TheatreDiaglog from "./TheatreDiaglog";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import ModifyTheatres from "./ModifyTheatres";
import DeleteTheatres from "./DeleteTheatre";
import ShowModel from "./Shows/ShowsModel";

export type TheatreDataType = {
  id: string;
  name: string;
  address: string;
  phone: number;
  email: string;
  isActive: boolean;
  userId: string;
};

export default async function TheatreLists({ userId }: { userId: string }) {
  const theatreData: TheatreDataType[] = await prisma.theatre.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <section className="flex flex-col justify-center gap-y-5 mt-5">
      <TheatreDiaglog />
      <Table>
        <TableCaption>Theatre Lists</TableCaption>
        <TableHeader>
          <TableRow className="sm:text-sm md:text-md">
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="">Phone</TableHead>
            <TableHead className="">Email</TableHead>
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
                <TableCell className="flex items-center gap-x-2 ">
                  <ModifyTheatres
                    id={theatre.id}
                    name={theatre.name}
                    address={theatre.address}
                    phone={theatre.phone}
                    email={theatre.email}
                    isActive={theatre.isActive}
                    userId={theatre.userId}
                  />
                  <DeleteTheatres id={theatre.id} />
                  {theatre.isActive && 
                  <ShowModel
                    id={theatre.id}
                    name={theatre.name}
                    address={theatre.address}
                    phone={theatre.phone}
                    email={theatre.email}
                    isActive={theatre.isActive}
                    userId={theatre.userId}
                  />
 }
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
