import { useState, useCallback } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

const PRICE_ID = "price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async (): Promise<string> => {
    const returnUrl = `${window.location.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        priceId: PRICE_ID,
        customerEmail: email,
        customerName: name,
        returnUrl,
        environment: getStripeEnvironment(),
      },
    });
    if (error || !data?.clientSecret) {
      throw new Error(data?.error || error?.message || "Failed to start checkout");
    }
    return data.clientSecret as string;
  }, [name, email]);

  const canStart = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="min-h-screen bg-muted/50">
      <PaymentTestModeBanner />
      <div className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">
              CyberCloud <span className="text-primary">Extreme Defender</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Complete Your Purchase</h1>
          <p className="text-muted-foreground">Secure checkout · One-time payment</p>
        </div>

        <Card className="mb-6 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">CyberCloud Extreme Defender</p>
                <p className="text-sm text-muted-foreground">
                  Lifetime license · All security features included
                </p>
              </div>
              <p className="text-2xl font-extrabold text-foreground">$399</p>
            </div>
          </CardContent>
        </Card>

        {!started ? (
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="font-semibold text-foreground">Your Information</h2>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                className="w-full h-11"
                disabled={!canStart}
                onClick={() => {
                  setError(null);
                  setStarted(true);
                }}
              >
                Continue to Payment
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                256-bit TLS encryption · Your card details are never stored on our servers.
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-2 md:p-4">
              <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Checkout;
