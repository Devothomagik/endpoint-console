import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { sessionId, environment } = (await req.json()) as {
      sessionId: string;
      environment: StripeEnv;
    };
    if (!sessionId || !/^[a-zA-Z0-9_]+$/.test(sessionId)) throw new Error("Invalid sessionId");
    if (environment !== "sandbox" && environment !== "live") throw new Error("Invalid environment");

    const stripe = createStripeClient(environment);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const amountTotal = (session.amount_total ?? 0) / 100;
    const currency = (session.currency ?? "usd").toUpperCase();

    return new Response(
      JSON.stringify({
        status: session.status,
        paymentStatus: session.payment_status,
        amount: amountTotal.toFixed(2),
        currency,
        customerEmail: session.customer_details?.email ?? session.metadata?.customerEmail ?? null,
        customerName: session.customer_details?.name ?? session.metadata?.customerName ?? null,
        transactionId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? session.id,
        created: session.created,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("get-checkout-session error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
