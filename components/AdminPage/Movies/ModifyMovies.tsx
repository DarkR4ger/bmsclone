import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import FormSubmit from "@/components/FormSubmit";
import { MoviesDataType } from "./MoviesLists";
import { modifyMovie } from "@/actions/movies/modifyMovie";

export default function ModifyMovie({
  id,
  title,
  description,
  duration,
  genre,
  language,
  releaseDate,
  poster,
}: MoviesDataType) {


  const movieUpdateWithId = modifyMovie.bind(null,id)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-end">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form className="grid items-center gap-y-4" action={movieUpdateWithId}>
          <DialogHeader>
            <DialogTitle>Add Movie</DialogTitle>
            <DialogDescription>Add a movie into the list</DialogDescription>
          </DialogHeader>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="movie-name">Movie Name</Label>
            <Input
              id="movie-name"
              type="text"
              name="movie-name"
              placeholder="Enter the movie name..."
              defaultValue={title}
              required
            />
          </div>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="movie-description">Movie Description</Label>
            <Textarea
              placeholder="Enter movie description"
              id="movie-description"
              name="movie-description"
              maxLength={300}
              defaultValue={description}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="movie-duration">Movie Duration (min)</Label>
              <Input
                type="number"
                placeholder="Enter movie duration..."
                id="movie-duration"
                name="movie-duration"
                defaultValue={duration}
                required
              />
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="movie-language">Select Language</Label>
              <Select name="movie-language" defaultValue={language} required>
                <SelectTrigger className="" id="movie-language">
                  <SelectValue placeholder="Select a language.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="malayalam">Malayalam</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="movie-release-date">Movie Release Date</Label>
              <Input
                type="date"
                placeholder="Select release date..."
                id="movie-release-date"
                name="movie-release-date"
                defaultValue={releaseDate}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 ">
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="movie-genre">Select Language</Label>
              <Select required name="movie-genre" defaultValue={genre}>
                <SelectTrigger className="" id="movie-genre">
                  <SelectValue placeholder="Select a genre.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genre</SelectLabel>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="historical">Historical</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label htmlFor="movie-poster-url">Poster URL</Label>
              <Input
                type="url"
                name="movie-poster-url"
                required
                defaultValue={poster}
                placeholder="Enter the poster url..."
              />
            </div>
          </div>
          <DialogFooter>
            <FormSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
