import { NextRequest, NextResponse } from "next/server";
import { Token } from "react-stripe-checkout";
import Stripe from 'stripe'

type StripApiProps = {
  token : Token
  amount: number
}


export async function POST(req: NextRequest) {
  const data = await req.json();
  const price = parseInt(data)
  const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
  const stripe = new Stripe(STRIPE_PRIVATE_KEY)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "inr",
      payment_method_types: ['card'],
      description: `Payment for order ${price}`
    })

    return NextResponse.json({
      success: true,
      message: 'created a payment',
      clientSecret: paymentIntent.client_secret
    })

  }
  catch (err) {
    return NextResponse.json({
      success: false,
      message: (err as Error).message
    })

  }

}
