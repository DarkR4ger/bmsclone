"use client";

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
import FormSubmit from "@/components/FormSubmit";
import { Input } from "@/components/ui/input";
import { approveOrBlockTheatres } from "@/actions/theatres/approveOrBlockTheatres";
import { useFormState } from "react-dom";
import { FormState } from "@/actions/theatres/addTheatre";
import { useEffect } from "react";
import { toast } from "sonner";


const initialMessage: FormState = {
  success: false,
  message: "",
};


const TheatreAction = ({
  isActive,
  theatreId,
}: {
  isActive: boolean;
  theatreId: string;
}) => {
  const [formState, theatreAction] = useFormState(approveOrBlockTheatres, initialMessage);
  
  useEffect(() => {
    const showFormResponse = () => {
      if (formState.success) {
        toast.success(formState.message);
      }
      else if(!formState.success && formState.message.includes('wrong')){
        toast.warning(formState.message);
      }
      else if(!formState.success && formState.message.startsWith('something')){
        toast.error(formState.message);
      }
    };
    showFormResponse();
  }, [formState]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isActive ? (
          <Button className="" variant="destructive">
            Block
          </Button>
        ) : (
          <Button className="" variant="outline">
            Approve
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form className="grid items-center gap-y-4" action={theatreAction}>
          <DialogHeader>
            <DialogTitle>Update</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure want to update?
          </DialogDescription>
          <Input type="hidden" value={theatreId} name="theatreId" />
          <Input
            type="hidden"
            value={isActive ? "true" : "false"}
            name="isActive"
          />
          <DialogFooter>
            <FormSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TheatreAction;
