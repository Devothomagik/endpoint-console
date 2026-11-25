# endpoint-console

A concept I put together for a cloud VM endpoint-security product: a marketing-style landing page, a dashboard preview, and a Stripe checkout flow. It is a prototype. The dashboard is a static mock-up with sample data, and none of the security features it talks about are actually implemented.

## What is in here

- A landing page and a dashboard preview page (React, with sample data only)
- An embedded Stripe checkout page
- Two Supabase edge functions (Deno) that create and look up a checkout session
- A few unit tests with Vitest

## Stack

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Stripe, Supabase edge functions.

## Running it locally

    npm install
    cp .env.example .env
    npm run dev

Fill in .env first, the variable names are listed in .env.example. Tests run with npm test.

For checkout you need a Stripe account and a price id (replace the placeholder in src/pages/Checkout.tsx). The edge function secrets are listed as comments in .env.example, and supabase/config.toml has a placeholder project id to swap for your own.

## Notes

The edge functions were written against a hosted payments gateway, so they read a gateway key and base url instead of calling Stripe directly. To use them elsewhere you would have to change them to call the Stripe API yourself.
