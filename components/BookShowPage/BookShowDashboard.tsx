"use client";
import { FullShowsDataType } from "@/app/(profile)/bookshow/[id]/page";
import { Card, CardContent } from "../ui/card";
import moment from "moment";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";

type SeatsProp = {
  totalSeats: number;
  selectedSeats: number[];
  setSelectedSeats: Dispatch<SetStateAction<number[]>>;
  bookedSeats: Number[];
};

const Seats = ({
  totalSeats,
  selectedSeats,
  setSelectedSeats,
  bookedSeats,
}: SeatsProp) => {
  const columns = 12;
  const rows = Math.ceil(totalSeats / columns);
  return (
    <div className="">
      <p className="text-center">Screen this side</p>
      <Separator />
      <div>
        <Card>
          <CardContent className="space-y-4 mt-6">
            {Array.from(Array(rows).keys()).map((seat, seatIndex) => {
              return (
                <div key={seatIndex} className="flex gap-2 justify-between">
                  {Array.from(Array(columns).keys()).map((column, index) => {
                    const seatNumber = seat * columns + column + 1;
                    const [isSeatBooked, setIsSeatBooked] = useState(false);
                    const [isSeatSelected, setIsSeatSelected] = useState(false);

                    const handleClick = () => {
                      if (selectedSeats.includes(seatNumber)) {
                        setSelectedSeats(
                          selectedSeats.filter((seat) => seat != seatNumber),
                        );
                      } else {
                        setSelectedSeats([...selectedSeats, seatNumber]);
                      }
                      setIsSeatSelected(!isSeatSelected);
                    };

                    if (bookedSeats.includes(seatNumber)) {
                      setIsSeatBooked(true);
                    }

                    return (
                      seatNumber <= totalSeats && (
                        <Button
                          key={index}
                          variant={isSeatSelected ? "default" : "outline"}
                          onClick={handleClick}
                          disabled={isSeatBooked}
                        >
                          {seatNumber}
                        </Button>
                      )
                    );
                  })}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function BookShowDashboard({
  props,
}: {
  props: FullShowsDataType;
}) {
  const { movie, bookedSeats, totalSeats, theatre, date, time } = props;
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

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
                  {Math.ceil(selectedSeats.length * props.ticketPrice)}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
