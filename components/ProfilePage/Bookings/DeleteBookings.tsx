import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/FormSubmit";
import { PopulatedDataType } from "@/actions/theatres/bookings/getBookingsByUser";
import { deleteBooking } from "@/actions/theatres/bookings/deleteBookings";
import { toast } from "sonner";

export default function DeleteBookings({
  booking,
}: {
  booking: PopulatedDataType;
}) {
  const deleteBookingAction = async(data: FormData) => {
    const toastId = toast.loading("Logging in...");
    try{
      const {success,message} = await deleteBooking(data)
      if(success){
        toast.success(message, {id : toastId})
      }
      else{
        toast.error(message, {id : toastId})
      }
    }
    catch(err){
      toast.error((err as Error).message, {
        id: toastId,
      });

    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Cancel Booking</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form
          className="grid items-center gap-y-4"
          action={deleteBookingAction}
        >
          <input type='hidden' name="showId" value={booking.show.id} />
          <input type='hidden' name="bookingId" value={booking.id} />
          <input type='hidden' name="seats" value={JSON.stringify(booking.seats)} />
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
          </DialogHeader>
          <p>Are you sure want to cancel the booking?</p>
          <DialogFooter>
            <FormSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
