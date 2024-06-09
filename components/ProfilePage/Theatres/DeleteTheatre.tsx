import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import FormSubmit from "@/components/FormSubmit";
import { deleteTheatre } from "@/actions/theatres/deleteTheatres";


export default function DeleteTheatres({id} : {id: string}) {

  const deleteTheatreWithId = deleteTheatre.bind(null,id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-1"  >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form className="grid items-center gap-y-4" action={deleteTheatreWithId} >
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
          </DialogHeader>
          <DialogDescription>
          Are you sure want to delete?
          </DialogDescription>
          <DialogFooter>
            <FormSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

}
