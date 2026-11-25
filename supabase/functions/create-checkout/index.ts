import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  priceId: string;
  customerEmail?: string;
  customerName?: string;
  returnUrl: string;
  environment: StripeEnv;
}

const CYBERCLOUD_PRICE_ID = "cybercloud_extreme_defender_onetime";
const CYBERCLOUD_PRODUCT_NAME = "CyberCloud Extreme Defender";
const CYBERCLOUD_PRODUCT_DESCRIPTION =
  "One-time access to CyberCloud Extreme Defender cloud security protection and deployment onboarding.";
const CYBERCLOUD_AMOUNT_CENTS = 39900;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Body;
    const { priceId, customerEmail, customerName, returnUrl, environment } = body;

    if (!priceId || !/^[a-zA-Z0-9_-]+$/.test(priceId)) {
      throw new Error("Invalid priceId");
    }
    if (!returnUrl) throw new Error("Missing returnUrl");
    if (environment !== "sandbox" && environment !== "live") {
      throw new Error("Invalid environment");
    }

    const stripe = createStripeClient(environment);

    const prices = await stripe.prices.list({ lookup_keys: [priceId] });
    const stripePrice = prices.data[0];

    if (!stripePrice && priceId !== CYBERCLOUD_PRICE_ID) {
      throw new Error("Price not found");
    }

    let productDescription = CYBERCLOUD_PRODUCT_NAME;
    if (stripePrice) {
      const productId = typeof stripePrice.product === "string"
        ? stripePrice.product
        : stripePrice.product.id;
      const product = await stripe.products.retrieve(productId);
      productDescription = product.name;
    }

    // Resolve / create a Customer so name + email persist on the Stripe object.
    let customerId: string | undefined;
    if (customerEmail) {
      const existing = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (existing.data.length) {
        customerId = existing.data[0].id;
        if (customerName && existing.data[0].name !== customerName) {
          await stripe.customers.update(customerId, { name: customerName });
        }
      } else {
        const created = await stripe.customers.create({
          email: customerEmail,
          ...(customerName && { name: customerName }),
        });
        customerId = created.id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [stripePrice
        ? { price: stripePrice.id, quantity: 1 }
        : {
          price_data: {
            currency: "usd",
            unit_amount: CYBERCLOUD_AMOUNT_CENTS,
            product_data: {
              name: CYBERCLOUD_PRODUCT_NAME,
              description: CYBERCLOUD_PRODUCT_DESCRIPTION,
              tax_code: "txcd_10103001",
            },
          },
          quantity: 1,
        }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      ...(customerId && { customer: customerId }),
      payment_intent_data: { description: productDescription },
      metadata: {
        ...(customerName && { customerName }),
        ...(customerEmail && { customerEmail }),
      },
    } as any);

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("create-checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
