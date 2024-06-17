import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function BookShowPage({
  params,
}: {
  params: { id: string };
}) {

  const shows = await prisma.show.findFirst({
    where: {
      id: params.id
    },
    include: {
      movie: true,
      theatre: true
    }
  })

  if(!shows){
    redirect('/')
  }

  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}
