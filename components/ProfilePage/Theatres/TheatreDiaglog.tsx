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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormSubmit from "@/components/FormSubmit";
import { FormState, addTheatre } from "@/actions/addTheatre";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const initialMessage: FormState = {
  success: false,
  message: "",
};

const TheatreDiaglog = () => {
  const [formState, theatreAction] = useFormState(addTheatre, initialMessage);

  useEffect(() => {
    const showFormResponse = () => {
      if (formState.success) {
        toast.success(formState.message);
      }
      else if(!formState.success && formState.message.startsWith('data')){
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
        <Button variant="outline" className="self-end">
          Add theatre
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[500px]">
        <form className="grid items-center gap-y-4" action={theatreAction}>
          <DialogHeader>
            <DialogTitle>Add Theatre</DialogTitle>
            <DialogDescription>
              Add your theatre to get approve{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="theatreName">Theatre Name</Label>
            <Input
              id="theatreName"
              type="text"
              name="theatreName"
              placeholder="Enter the theatre name..."
              required
            />
          </div>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="address">Address</Label>
            <Textarea
              placeholder="Enter your address"
              id="address"
              name="address"
              maxLength={100}
              required
            />
          </div>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="phonenumber">Phone Number</Label>
            <Input
              id="phonenumber"
              type="tel"
              name="phonenumber"
              placeholder="Enter your phone number..."
              maxLength={10}
              required
            />
          </div>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email..."
              required
            />
          </div>
          <DialogFooter>
            <FormSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TheatreDiaglog;
