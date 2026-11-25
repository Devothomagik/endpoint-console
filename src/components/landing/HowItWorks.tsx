import { CreditCard, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: CreditCard,
    step: "01",
    title: "Purchase",
    desc: "One-time $399 payment. No subscriptions, no hidden fees.",
  },
  {
    icon: LinkIcon,
    step: "02",
    title: "Connect",
    desc: "Link your Google Cloud project through our guided setup wizard.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "Protected",
    desc: "All 17 security features activate instantly across your VMs.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="bg-background py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-16 max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          How It Works
        </p>
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          Live in{" "}
          <span className="font-serif-accent text-primary">three steps.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border bg-card shadow-sm">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
              Step {s.step}
            </span>
            <h3 className="mb-1 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
