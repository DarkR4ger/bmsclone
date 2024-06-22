import { createCheckoutSesssion } from "@/actions/stripe";
import getStripe from "@/utils/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/reduxhook";
import { setLoading } from "@/redux/loadingSlice";
import { Loader2 } from "lucide-react";

export type CheckoutFormProps = {
  totalSeats: number;
  amount: number;
  showId: string;
  seats: number[];
}

export default function CheckoutForm({totalSeats,amount, showId, seats}: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const isLoading = useAppSelector((state) => state.loading.loading )
  const userEmail = useAppSelector((state) => state.user.email)
  const dispatch = useAppDispatch();

  const formAction = async (data: FormData) => {
    dispatch(setLoading(true))
    const { client_secret, url } = await createCheckoutSesssion(data);
    dispatch(setLoading(false))
    return setClientSecret(client_secret);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="totalSeats" value={totalSeats} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="showId" value={showId} />
        <input type="hidden" name="seats" value={JSON.stringify(seats)} />
        <Button
          disabled={isLoading}
          className="flex items-center gap-x-2"
        >
          <span>Pay {amount} to book</span>
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}
