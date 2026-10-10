export async function onRequestPost(context) {
  const { env } = context;
  const STRIPE_KEY = env.STRIPE_SECRET_KEY;
  const PRICE_ID = env.STRIPE_PRICE_PRO || env.STRIPE_PRICE_ID || "price_1TYJ8zIvemfuYiaoT5Q7ec4w";
  if(!STRIPE_KEY) return new Response(JSON.stringify({error:"Falta STRIPE_SECRET_KEY en Cloudflare Env Vars"}),{status:500,headers:{"Content-Type":"application/json"}});
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${STRIPE_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "mode": "payment",
      "success_url": "https://abismal.pages.dev/success.html",
      "cancel_url": "https://abismal.pages.dev/cancel.html",
      "line_items[0][price]": PRICE_ID,
      "line_items[0][quantity]": "1"
    })
  });
  const data = await res.json();
  if(!res.ok) return new Response(JSON.stringify(data),{status:400,headers:{"Content-Type":"application/json"}});
  return new Response(JSON.stringify({url:data.url}),{headers:{"Content-Type":"application/json"}});
}
