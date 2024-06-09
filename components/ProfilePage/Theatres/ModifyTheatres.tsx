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
import { FormState } from "@/actions/theatres/addTheatre";
import { modifyTheatre } from "@/actions/theatres/modifyTheatre";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { TheatreDataType } from "./TheatreLists";
import { Pencil } from "lucide-react";

const initialMessage: FormState = {
  success: false,
  message: "",
};

export const ModifyTheatres = ({
  id,
  name,
  address,
  phone,
  email,
  isActive,
  userId
}: TheatreDataType) => {
  const [formState, theatreAction] = useFormState(modifyTheatre, initialMessage);

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
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[500px]">
        <form className="grid items-center gap-y-4" action={theatreAction}>
          <DialogHeader>
            <DialogTitle>Edit Theatre</DialogTitle>
            <DialogDescription>
              Edit your theatre to get approve{" "}
            </DialogDescription>
          </DialogHeader>
          <Input type="hidden" value={id} name="theatreId" />
          <Input type="hidden" value={userId} name="userId" />
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="theatreName">Theatre Name</Label>
            <Input
              id="theatreName"
              type="text"
              name="theatreName"
              placeholder="Enter the theatre name..."
              defaultValue={name}
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
              defaultValue={address}
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
              defaultValue={phone}
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
              defaultValue={email}
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

export default ModifyTheatres;
