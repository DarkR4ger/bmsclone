import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import FormSubmit from "@/components/FormSubmit";
import { deleteMovie } from "@/actions/deleteMovie";


export default function DeleteMovies({id} : {id: string}) {

  const deleteMovieWithId = deleteMovie.bind(null,id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-1"  >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form className="grid items-center gap-y-4" action={deleteMovieWithId} >
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure want to delete?</p>
          <DialogFooter>
            <FormSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

}
