"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSubmit from "@/components/FormSubmit";
import { initialMessage } from "../TheatreDiaglog";
import { useFormState } from "react-dom";
import { addShows } from "@/actions/shows/addShows";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MoviesDataType } from "@/components/AdminPage/Movies/MoviesLists";

export default function ShowForm({ id }: { id: string }) {
  const [formState, showAction] = useFormState(addShows, initialMessage);
  const [movies, setMovies] = useState<MoviesDataType[]>([]);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const showFormResponse = () => {
      if (formState.success) {
        toast.success(formState.message);
      } else if (!formState.success && formState.message.startsWith("data")) {
        toast.warning(formState.message);
      } else if (
        !formState.success &&
        formState.message.startsWith("something")
      ) {
        toast.error(formState.message);
      }
    };
    showFormResponse();
  }, [formState]);

  useEffect(() => {
    const getAllMovies = async () => {
      const res = await fetch("/api/movies");
      if (!res) {
        toast.error("Something went wrong");
      }
      const jsonData = await res.json();
      const moviesData: MoviesDataType[] = jsonData.data;
      setMovies(moviesData);
    };
    getAllMovies();

    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  return (
    <form className="grid gap-y-7 items-center" action={showAction}>
      <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center md:gap-x-2 justify-center">
        <div className="grid gap-2 items-center flex-1 w-full">
          <Label htmlFor="showName">Show name</Label>
          <Input
            type="text"
            id="showName"
            name="showName"
            placeholder="Enter the show name..."
            required
          />
        </div>
        <div className="grid gap-2 items-center flex-1 w-full">
          <Label htmlFor="showDate">Show Date</Label>
          <Input
            type="date"
            id="showDate"
            name="showDate"
            placeholder="Enter the show name..."
            min={minDate}
            required
          />
        </div>
        <div className="grid gap-2 items-center flex-1 w-full">
          <Label htmlFor="time">Time</Label>
          <Input
            type="time"
            id="time"
            name="time"
            placeholder="Enter the show time..."
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center md:gap-x-2 justify-center">
        <div className="grid gap-2 items-center flex-1 w-full">
          <Label htmlFor="movie">Movie</Label>
          <Select name="movie" required>
            <SelectTrigger className="" id="movie">
              <SelectValue placeholder="Select a language.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Movies</SelectLabel>
                {movies.map((movie) => {
                  return (
                    <SelectItem
                      key={movie.id}
                      value={movie.title.toLowerCase()}
                    >
                      {movie.title}{" "}
                      <Input type="hidden" value={movie.id} name="movieId" />{" "}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 items-center flex-1 w-full">
          <Label htmlFor="ticketPrice">Ticket Price</Label>
          <Input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            placeholder="Enter the ticket price..."
            required
          />
        </div>
        <div className="grid gap-2 items-center flex-1 w-full">
          <Label htmlFor="totalSeats">Total Seats</Label>
          <Input
            type="number"
            id="totalSeats"
            name="totalSeats"
            placeholder="Enter the total seats..."
            required
          />
        </div>
      </div>
      <Input type="hidden" value={id} name="theatreId" />
      <div className="flex items-center justify-end">
        <FormSubmit />
      </div>
    </form>
  );
}
