import TransactionPage from "@/components/BookShowPage/TransactionPage";
import { stripe } from "@/lib/stipe";
import type { Stripe } from "stripe";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });


  return (
    <>
      <TransactionPage checkoutSession={checkoutSession} />
    </>
  );
}

