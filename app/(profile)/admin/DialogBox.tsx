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

export function DialogBox() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-end">
          Add movie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Movie</DialogTitle>
          <DialogDescription>Add a movie into the list</DialogDescription>
        </DialogHeader>
        <form className="grid items-center gap-y-4">
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="movie-name">Movie Name</Label>
            <Input
              id="movie-name"
              type="text"
              name="movie-name"
              placeholder="Enter the movie name..."
            />
          </div>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="movie-description">Movie Description</Label>
            <Textarea
              placeholder="Enter movie description"
              id="movie-description"
              name="movie-description"
              minLength={300}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="movie-duration">Movie Duration (min)</Label>
              <Input
                type="number"
                placeholder="Enter movie duration..."
                id="movie-duration"
                name="movie-duration"
              />
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="movie-language">Select Language</Label>
              <Select>
                <SelectTrigger className="" id="movie-language" name="movie-language">
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
              <Label htmlFor="movie-duration">Movie Duration (min)</Label>
              <Input
                type="number"
                placeholder="Enter movie duration..."
                id="movie-duration"
                name="movie-duration"
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
