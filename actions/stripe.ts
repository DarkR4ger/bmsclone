'use server'

import type { Stripe as StripeType } from 'stripe'
import Stripe from 'stripe'

import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)



export async function createCheckoutSesssion(data: FormData): Promise<{ client_secret: string | null; url: string | null }> {

  const totalSeats = parseInt(data.get('totalSeats') as string)
  const amount = Number(data.get('amount') as string)
  const showId = (data.get('showId') as string)
  const seats = JSON.parse(data.get('seats') as string)
  const origin: string = headers().get('origin') as string

  const checkoutSession: StripeType.Checkout.Session = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: 'pay',
    billing_address_collection: 'required',
    payment_intent_data: {
      description: JSON.stringify(seats)
    },
    line_items: [
      {
        quantity: totalSeats,
        price_data: {
          currency: 'INR',
          product_data: {
            name: "Seat booking"
          },
          unit_amount: (totalSeats < 2 ? amount : amount/totalSeats) * 100
        }
      }
    ],
    return_url: `${origin}/bookshow/${showId}/result?session_id={CHECKOUT_SESSION_ID}`,
    ui_mode: 'embedded'
  })

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url
  }

}
