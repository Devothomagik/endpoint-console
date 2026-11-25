import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] py-24 lg:py-36">
      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--hero-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--hero-foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--hero-muted))]/20 bg-[hsl(var(--hero-foreground))]/5 px-3 py-1 text-xs font-medium text-[hsl(var(--hero-muted))]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Now protecting 2,000+ VMs worldwide
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-[hsl(var(--hero-foreground))] md:text-5xl lg:text-6xl">
            Security built for{" "}
            <span className="font-serif-accent text-primary">Google Cloud</span>{" "}
            Compute Engine
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[hsl(var(--hero-muted))] lg:text-lg">
            Endpoint firewall, malware scanning, threat intelligence, and real-time monitoring — 17 integrated security features in one platform.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/checkout">
              <Button size="lg" className="group h-12 rounded-xl px-8 text-sm font-semibold">
                Get Protected — $399
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="ghost" size="lg" className="h-12 rounded-xl px-8 text-sm text-[hsl(var(--hero-muted))] hover:bg-[hsl(var(--hero-foreground))]/5 hover:text-[hsl(var(--hero-foreground))]">
                See all features
              </Button>
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-[hsl(var(--hero-muted))]">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary/70" />
              Google Cloud Compatible
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary/70" />
              24/7 Protection
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary/70" />
              Instant Activation
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
