'use client'
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
const FormSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="flex items-center gap-x-4"
      disabled={pending}
      type="submit"
    >
      Save changes
      {pending && (
        <span className="animate-spin inline-flex">
          <Loader2 />
        </span>
      )}
    </Button>
  );
};

export default FormSubmit
