import { Shield, Activity, Ban, ScanLine, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Shield, label: "Firewall", value: "Active", accent: true },
  { icon: Ban, label: "IPs Blocked", value: "1,247", accent: false },
  { icon: ScanLine, label: "Last Scan", value: "2m ago", accent: false },
  { icon: AlertTriangle, label: "Threats", value: "3", accent: false },
  { icon: Activity, label: "Traffic", value: "12.4 GB", accent: false },
  { icon: CheckCircle, label: "VMs", value: "Healthy", accent: true },
];

const DashboardPreview = () => (
  <section className="bg-[hsl(var(--hero-bg))] py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Dashboard
        </p>
        <h2 className="mb-3 text-3xl font-bold text-[hsl(var(--hero-foreground))] lg:text-4xl">
          Everything at{" "}
          <span className="font-serif-accent text-primary">a glance.</span>
        </h2>
        <p className="text-sm text-[hsl(var(--hero-muted))]">
          Firewall activity, scan results, threat updates, and blocked IPs — one unified view.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="rounded-2xl border border-[hsl(var(--hero-muted))]/10 bg-[hsl(var(--hero-foreground))]/[0.03] p-5 backdrop-blur-sm">
          {/* Window chrome */}
          <div className="mb-4 flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--hero-muted))]/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--hero-muted))]/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--hero-muted))]/20" />
            <span className="ml-3 text-[10px] text-[hsl(var(--hero-muted))]/50 font-mono">dashboard.cybercloud.io</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-[hsl(var(--hero-muted))]/10 bg-[hsl(var(--hero-foreground))]/[0.03] p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-primary/70" />
                  <span className="text-xs text-[hsl(var(--hero-muted))]">{s.label}</span>
                </div>
                <p className={`text-xl font-bold ${s.accent ? "text-[hsl(var(--cyber-success))]" : "text-[hsl(var(--hero-foreground))]"}`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DashboardPreview;
