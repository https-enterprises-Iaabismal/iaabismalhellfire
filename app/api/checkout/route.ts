import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export async function POST(){
  const session = await stripe.checkout.sessions.create({
    mode:'payment',
    line_items:[{price:'price_1TYJ8zIvemfuYiaoT5Q7ec4w', quantity:1}],
    success_url:`https://iaabismalhellfire.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`https://iaabismalhellfire.vercel.app/feed/metal`,
  })
  return Response.json({url: session.url})
}
