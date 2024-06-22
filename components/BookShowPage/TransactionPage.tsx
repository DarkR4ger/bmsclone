"use client";
import type { Stripe } from "stripe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { booking } from "@/actions/booking";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/lib/reduxhook";
import { toast } from "sonner";

export default function TransactionPage({
  checkoutSession,
}: {
  checkoutSession: Stripe.Checkout.Session;
}) {
  const ref = useRef(false)
  const userEmail = useAppSelector((state) => state.user.email) 
  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  const data = {
    email: userEmail,
    showId: checkoutSession.return_url!.split("/")[4] as string,
    seats: JSON.parse(paymentIntent.description!) as number[],
    transactionId: paymentIntent.client_secret as string,
  };
  const getData = async () => {
    const book = await booking(data);
    if (!book.success) {
      toast.warning(book.message)
    }
    else{
      toast.success(book.message)
    }
  };

  useEffect(() => {
    if(ref.current) return
    ref.current = true
    if(paymentIntent.status === "succeeded"){
      getData();
    }
  },[]);

  return (
    <div className="flex items-center justify-center mt-10">
      <Card className="md:w-[500px]">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Booking transaction details</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-7 justify-center">
          <div>
            <p className="md:text-xl">
              PaymentStatus:{" "}
              {paymentIntent.status === "succeeded" ? (
                <span className="text-green-600 bg-green-100 p-2 px-3 rounded-full">
                  Success
                </span>
              ) : (
                <span className="text-red-600 bg-red-100 p-2 px-3 rounded-full">
                  Failed
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Payment type</p>
              <p className="capitalize">
                {checkoutSession.payment_method_types[0]}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Name</p>
              <p className="capitalize">
                {checkoutSession.customer_details?.name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Email</p>
              <p className="">{checkoutSession.customer_details?.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xl">Amount</p>
              <p className="text-xl font-semibold">
                Rs {checkoutSession.amount_total! / 100}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={`${buttonVariants({ variant: "default" })} w-full`}
          >
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
