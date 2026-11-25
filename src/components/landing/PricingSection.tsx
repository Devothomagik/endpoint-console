import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const included = [
  "Endpoint Firewall for VMs",
  "Malware & Integrity Scanner",
  "Threat Intelligence Feed",
  "Real-Time IP Blocklist",
  "Login Security & 2FA",
  "Live Traffic Monitoring",
  "Security Audit Trail",
  "Automated & On-Demand Scanning",
  "Centralized Dashboard",
  "Alerting & Notifications",
  "Remediation Support",
];

const PricingSection = () => (
  <section id="pricing" className="bg-background py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Pricing
        </p>
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          One price.{" "}
          <span className="font-serif-accent text-primary">Everything included.</span>
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-md"
      >
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-xl shadow-primary/5">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              One-Time Payment
            </span>
            <div className="mt-4">
              <span className="text-5xl font-bold text-foreground">$399</span>
              <span className="ml-1 text-sm text-muted-foreground">USD</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              No subscriptions · No hidden fees · Pay once
            </p>
          </div>

          <div className="mb-8 space-y-2.5">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <Check className="h-4 w-4 shrink-0 text-[hsl(var(--cyber-success))]" />
                {item}
              </div>
            ))}
          </div>

          <Link to="/checkout">
            <Button className="group w-full h-11 rounded-xl text-sm font-semibold" size="lg">
              Get Protected Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            All 17 security features · Instant activation · Secure checkout
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PricingSection;
