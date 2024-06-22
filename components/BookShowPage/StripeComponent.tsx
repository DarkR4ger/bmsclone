"use client";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/reduxhook";
import { setLoading } from "@/redux/loadingSlice";
import { Loader2 } from "lucide-react";

type StripComponetProp = {
  seats: number[];
  ticketPrice: number;
  totalPrice: number;
};

type StripeFetchProp = {
  success: boolean;
  message: string;
  clientSecret?: string;
};

const CheckoutForm = ({clientSecret} : {clientSecret: string}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    } else {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href
        }
      });
      console.log(result)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement  />
      <Button type="submit" disabled={!stripe} className="mt-2 flex w-full">
        Pay to book
      </Button>
    </form>
  );
};

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function StripComponent({
  seats,
  ticketPrice,
  totalPrice,
}: StripComponetProp) {
  const [clientSecret, setClientSecret] = useState("");
  const isLoading = useAppSelector((state) => state.loading);
  const dispatchLoading = useAppDispatch();

  const getClientSecret = async () => {
    const toastId = toast.loading("getting data...");
    dispatchLoading(setLoading(true));
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        body: JSON.stringify(totalPrice),
      });
      const data: StripeFetchProp = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message, {
          id: toastId,
        });
        setClientSecret(data.clientSecret!);
      } else {
        toast.warning(data.message, {
          id: toastId,
        });
      }
      dispatchLoading(setLoading(false));
    } catch (err) {
      toast.error("please try again" as string, {
        id: toastId,
      });
      dispatchLoading(setLoading(false));
    }
  };

  useEffect(() => {
    getClientSecret();
  }, [totalPrice]);

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <>
      {isLoading.loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )
      )}
    </>
  );
}
