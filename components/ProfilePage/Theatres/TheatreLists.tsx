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

export type TheatreDataType = {
  id: string;
  name: string;
  address: string;
  phone: number;
  email: string;
  isActive: boolean;
  userId: string;
};

export default async function TheatreLists() {
  const theatreData: TheatreDataType[] = await prisma.theatre.findMany();

  return (
    <section className="flex flex-col justify-center gap-y-5 mt-5">
      <TheatreDiaglog />
      <Table>
        <TableCaption>Theatre Lists</TableCaption>
        <TableHeader>
          <TableRow className="">
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
              <TableRow key={theatre.id}>
                <TableCell className="">{theatre.name}</TableCell>
                <TableCell className="w-80">{theatre.address}</TableCell>
                <TableCell className="">+91 {theatre.phone}</TableCell>
                <TableCell className="">{theatre.email}</TableCell>
                <TableCell className="">
                  <p
                    className={cn(" w-fit px-3 py-1 capitalize rounded-full", 
                    theatre.isActive ? 'bg-red-300 text-red-900' : 'bg-green-300 text-green-900')}
                  >
                    {theatre.isActive ? 'Pending' : 'Accepted'}
                  </p>
                </TableCell>
                <TableCell>
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
