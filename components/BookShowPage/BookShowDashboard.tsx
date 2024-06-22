"use client";
import { FullShowsDataType } from "@/app/(profile)/bookshow/[id]/page";
import { Card, CardContent } from "../ui/card";
import moment from "moment";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import Seats from "../Seats";

export default function BookShowDashboard({
  props,
}: {
  props: FullShowsDataType;
}) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const {
    movie,
    bookedSeats,
    id,
    totalSeats,
    ticketPrice,
    theatre,
    date,
    time,
  } = props;

  useEffect(() => {
    setTotalPrice(selectedSeats.length * ticketPrice);
  }, [selectedSeats, ticketPrice]);

  return (
    <div className="flex flex-col justify-center">
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-y-4 py-4 items-center justify-between">
          <div>
            <p className="font-semibold text-xl">{theatre.name}</p>
            <p className="text-gray-400 text-sm">{theatre.address}</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              {movie.title.toUpperCase()} &#40;{movie.language.toUpperCase()}
              &#41;
            </h2>
          </div>

          <div>
            <h2 className="font-medium">
              {moment(date).format("MMM Do YYYY")} &#8722;{" "}
              {moment(time, "HH:mm").format("hh:mm A")}
            </h2>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center justify-center min-h-screen mt-10">
        <Seats
          totalSeats={totalSeats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          bookedSeats={bookedSeats}
        />
        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm">
                  <b>Selected Seats</b> : {selectedSeats.join(" , ")}
                </h1>

                <h1 className="text-sm">
                  <b>Total Price</b> : Rs{" "}
                  {Math.ceil(selectedSeats.length * ticketPrice)}
                </h1>
              </div>
            </div>
            {totalSeats && (
              <CheckoutForm
                totalSeats={selectedSeats.length}
                amount={totalPrice!}
                showId={id}
                seats={selectedSeats}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
