import { ShowDataType } from "@/components/ProfilePage/Theatres/Shows/ShowLists";
import { TheatreDataType } from "@/components/ProfilePage/Theatres/TheatreLists";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ShowsDataType = {
  id: string;
  name: string;
  date: string;
  time: string;
  ticketPrice: number;
  totalSeats: number;
  bookedSeats: Number[];
  movieId: string;
  theatreId: string;
  createdAt: Date;
  updatedAt: Date;
  theatre: TheatreDataType;
};

export type UniqueTheatresType = TheatreDataType & {
  shows: ShowsDataType[];
};

export async function POST(req: NextRequest) {
  const { movieId, date } = await req.json();
  try {
    const shows = await prisma.show.findMany({
      where: {
        movieId: movieId,
        date: date,
      },
      include: {
        theatre: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let uniqueTheatres: UniqueTheatresType[] = [];
    shows.forEach((show) => {
      const theatre = uniqueTheatres.find(
        (theatre) => theatre.id == show.theatreId,
      );

      if (!theatre) {
        const showsForThisTheatre = shows.filter(
          (showObj) => showObj.theatreId == show.theatreId,
        );

        uniqueTheatres.push({
          ...show.theatre,
          shows: showsForThisTheatre
        });
      }
    });

    return NextResponse.json({
      success: true,
      body: uniqueTheatres,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
}
