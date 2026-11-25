import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Download, CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

interface PurchaseDetails {
  name: string;
  email: string;
  transactionId: string;
  amount: string;
  currency: string;
  date: string;
}

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<PurchaseDetails | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session reference. If you were charged, please contact support.");
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase.functions.invoke("get-checkout-session", {
        body: { sessionId, environment: getStripeEnvironment() },
      });
      if (error || data?.error) {
        setError(data?.error || error?.message || "Could not load receipt");
        setLoading(false);
        return;
      }
      if (data.paymentStatus !== "paid") {
        setError("Payment is not complete yet. Please refresh in a moment.");
        setLoading(false);
        return;
      }
      setDetails({
        name: data.customerName || "Customer",
        email: data.customerEmail || "",
        transactionId: data.transactionId,
        amount: data.amount,
        currency: data.currency,
        date: new Date((data.created || Date.now() / 1000) * 1000).toISOString(),
      });
      setLoading(false);
    })();
  }, [sessionId]);

  const downloadReceipt = () => {
    if (!details) return;
    const doc = new jsPDF();
    const formattedDate = new Date(details.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CyberCloud Extreme Defender", 20, 30);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Receipt", 20, 40);
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    doc.setFontSize(11);
    const y = 58;
    const lines: [string, string][] = [
      ["Product:", "CyberCloud Extreme Defender"],
      ["Amount Paid:", `$${details.amount} ${details.currency}`],
      ["Date:", formattedDate],
      ["Transaction ID:", details.transactionId],
      ["Customer:", details.name],
      ["Email:", details.email],
    ];
    lines.forEach(([label, value], i) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y + i * 10);
      doc.setFont("helvetica", "normal");
      doc.text(value, 70, y + i * 10);
    });

    doc.setDrawColor(59, 130, 246);
    doc.line(20, y + lines.length * 10 + 5, 190, y + lines.length * 10 + 5);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Thank you for your purchase! Your protection activates as soon as you link your cloud.",
      20,
      y + lines.length * 10 + 15,
    );
    doc.text("© CyberCloud Extreme Defender. All rights reserved.", 20, y + lines.length * 10 + 22);
    doc.save(`CyberCloud-Receipt-${details.transactionId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">
              CyberCloud <span className="text-primary">Extreme Defender</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-lg px-4 py-16">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            Verifying your payment…
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="font-semibold text-destructive">{error}</p>
              <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
            </CardContent>
          </Card>
        ) : details ? (
          <>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--cyber-success))]/10">
                <CheckCircle className="h-10 w-10 text-[hsl(var(--cyber-success))]" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-foreground">Payment Successful</h1>
              <p className="text-muted-foreground">
                Thank you, {details.name}. Your CyberCloud Extreme Defender license is active.
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="space-y-3 p-6">
                <h2 className="font-semibold text-foreground">Order Details</h2>
                <div className="space-y-2 text-sm">
                  <Row label="Product" value="CyberCloud Extreme Defender" />
                  <Row label="Amount" value={`$${details.amount} ${details.currency}`} />
                  <Row
                    label="Date"
                    value={new Date(details.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <Row label="Transaction ID" value={details.transactionId} mono />
                </div>
                <Button onClick={downloadReceipt} variant="outline" className="mt-4 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Receipt
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h2 className="mb-3 font-semibold text-foreground">Next Steps</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Link your cloud account and all security features go live across your workloads
                  immediately — no installation, no waiting period.
                </p>
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Link Your Cloud Account
                </Button>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const Row = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-medium text-foreground ${mono ? "font-mono text-xs break-all text-right" : ""}`}>
      {value}
    </span>
  </div>
);

export default ThankYou;
