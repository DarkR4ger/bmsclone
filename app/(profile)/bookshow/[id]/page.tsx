import { MoviesDataType } from "@/components/AdminPage/Movies/MoviesLists";
import BookShowDashboard from "@/components/BookShowPage/BookShowDashboard";
import { ShowDataType } from "@/components/ProfilePage/Theatres/Shows/ShowLists";
import { TheatreDataType } from "@/components/ProfilePage/Theatres/TheatreLists";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export type FullShowsDataType = ShowDataType & {
  movie: MoviesDataType;
  theatre: TheatreDataType;
};

export default async function BookShowPage({
  params,
}: {
  params: { id: string };
}) {
  const shows: FullShowsDataType = await prisma.show.findFirstOrThrow({
    where: {
      id: params.id,
    },
    include: {
      movie: true,
      theatre: true,
    },
  });

  if (!shows) {
    redirect("/");
  }

  return (
    <div>
      <BookShowDashboard props={shows} />
    </div>
  );
}
