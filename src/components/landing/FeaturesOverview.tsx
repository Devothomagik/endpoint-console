import { Shield, Lock, Eye, Zap } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: Shield,
    title: "Core Protection",
    desc: "VM-level firewall, malware scanning, threat intelligence feeds, and real-time IP blocking.",
    items: ["Endpoint Firewall", "Malware Scanner", "Threat Intel Feed", "IP Blocklist"],
  },
  {
    icon: Lock,
    title: "Access Security",
    desc: "Brute-force protection, TOTP-based 2FA, and login monitoring with automated lockouts.",
    items: ["Login Security", "2FA / TOTP", "Login Monitoring"],
  },
  {
    icon: Eye,
    title: "Visibility",
    desc: "Real-time traffic monitoring, full audit trails, and bot activity pattern analysis.",
    items: ["Live Traffic", "Audit Trail", "Bot Insights"],
  },
  {
    icon: Zap,
    title: "Detection & Response",
    desc: "Automated and on-demand scanning, vulnerability awareness, and guided remediation.",
    items: ["Auto Scanning", "On-Demand Scans", "Remediation Support", "Vuln Awareness"],
  },
];

const FeaturesOverview = () => (
  <section id="features" className="bg-background py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-16 max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Features
        </p>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          17 features. Four pillars.{" "}
          <span className="font-serif-accent text-primary">Zero extras to buy.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group rounded-2xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <cat.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1.5 text-lg font-semibold text-foreground">{cat.title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesOverview;
