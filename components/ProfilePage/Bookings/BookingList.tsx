"use client";

import {
  PopulatedDataType,
  getBookingByUser,
} from "@/actions/theatres/bookings/getBookingsByUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/lib/reduxhook";
import { Loader2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteBookings from "./DeleteBookings";
import LoaderSpinner from "@/components/LoaderSpinner";

export default function BookingList() {
  const [bookings, setBookings] = useState<PopulatedDataType[] | null>(null);
  const userId = useAppSelector((state) => state.user.id);
const getData = async () => {
    try {
      const { success, message, data } = await getBookingByUser(userId);
      if (success) {
        setBookings(data!);
      } else {
        toast.warning(message);
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl md:text-3xl mb-5 font-semibold">Bookings</h2>
      <div>
        {bookings ? (
          bookings.length > 0 &&
          bookings.map((booking, index) => {
            const { movie, theatre } = booking.show;
            const { show } = booking;
            return (
              <Card
                key={index}
                className="flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center"
              >
                <div className="self-start">
                  <CardHeader>
                    <CardTitle className="md:text-3xl">
                      {movie.title.toUpperCase()} &#40;
                      {movie.language.toUpperCase()}&#41;
                    </CardTitle>
                    <CardDescription>{theatre.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="md:text-xl font-medium flex flex-col gap-y-4">
                      <p>
                        Date &#58; {moment(show.date).format("MMM Do YYYY")}
                      </p>
                      <p>
                        Time &#58;{" "}
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                      </p>
                      <p>
                        Amount &#58; &#8377;{" "}
                        {show.ticketPrice * booking.seats.length}
                      </p>
                      <p>BookingId &#58; {booking.id}</p>
                      <p>Seats &#58; {booking.seats.toString()}</p>
                    </div>
                  </CardContent>
                </div>
                <div className="p-2 flex flex-col gap-y-2 justify-center">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={200}
                    height={200}
                  />
                    <DeleteBookings booking={booking}  />
                </div>
              </Card>
            );
          })
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
}
