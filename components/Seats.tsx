import { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

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
                <div key={seatIndex} className="md:flex grid grid-cols-3  gap-2 justify-between">
                  {Array.from(Array(columns).keys()).map((column, index) => {
                    const seatNumber = seat * columns + column + 1;
                    const [isSeatSelected, setIsSeatSelected] = useState(false);
                    const handleClick = (seatNumber: number) => {
                      if (selectedSeats.includes(seatNumber)) {
                        setSelectedSeats(
                          selectedSeats.filter((seat) => seat != seatNumber),
                        );
                      } else {
                        setSelectedSeats([...selectedSeats, seatNumber]);
                      }
                      setIsSeatSelected(!isSeatSelected);
                    };


                    return (
                      seatNumber <= totalSeats && (
                        <Button
                          key={index}
                          variant={isSeatSelected ? "default" : "outline"}
                          className="disabled:bg-gray-300"
                          onClick={() => handleClick(seatNumber)}
                          disabled={bookedSeats.includes(seatNumber)}
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

export default Seats;
