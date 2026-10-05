"use server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function createCheckout() {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: "price_1TYJ8zIvemfuYiaoT5Q7ec4w", quantity: 1 }],
    success_url: "https://iaabismalhellfire.vercel.app/success",
    cancel_url: "https://iaabismalhellfire.vercel.app/feed/metal",
  });
  return session.url;
}
