import { useState } from "react";
import {
  Shield, Bug, Radio, Ban, Lock, KeyRound, UserCheck,
  Activity, FileText, Bot, AlertTriangle, ScanLine, Search,
  Wrench, LayoutDashboard, Bell, Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "protection",
    label: "Protection",
    features: [
      { icon: Shield, title: "Endpoint Firewall", desc: "VM-level firewall inspecting & blocking malicious requests with rule-based traffic filtering." },
      { icon: Bug, title: "Malware Scanner", desc: "Scans for malicious code, backdoors, web shells, and unauthorized file modifications." },
      { icon: Radio, title: "Threat Intelligence", desc: "Continuous updates for firewall rules, malware signatures, and malicious IP indicators." },
      { icon: Ban, title: "IP Blocklist", desc: "Blocks known malicious IPs in real time, reducing attack noise and bot traffic." },
    ],
  },
  {
    id: "access",
    label: "Access",
    features: [
      { icon: Lock, title: "Login Security", desc: "Brute-force protection with rate limiting, lockout policies, and credential stuffing detection." },
      { icon: KeyRound, title: "Two-Factor Auth", desc: "TOTP support via Google Authenticator, Authy, and other popular authenticator apps." },
      { icon: UserCheck, title: "Login Monitoring", desc: "Tracks login attempts, detects abnormal activity, and triggers policy-based lockouts." },
    ],
  },
  {
    id: "visibility",
    label: "Visibility",
    features: [
      { icon: Activity, title: "Live Traffic", desc: "Real-time view of requests, source IPs, and suspicious activity on protected VMs." },
      { icon: FileText, title: "Audit Trail", desc: "Logs firewall actions, login events, and scan findings for forensic review." },
      { icon: Bot, title: "Bot Insights", desc: "Identifies suspicious patterns and distinguishes legitimate traffic from abusive automation." },
    ],
  },
  {
    id: "response",
    label: "Response",
    features: [
      { icon: AlertTriangle, title: "Vuln Awareness", desc: "Threat-intelligence-driven exploit detection with continuous feed updates." },
      { icon: ScanLine, title: "Auto Scanning", desc: "Scheduled scans for continuous monitoring and suspicious change detection." },
      { icon: Search, title: "On-Demand Scans", desc: "Run scans after deployments or incidents for immediate threat assessment." },
      { icon: Wrench, title: "Remediation", desc: "Guided malware removal and post-incident hardening recommendations." },
      { icon: LayoutDashboard, title: "Dashboard", desc: "Unified view of firewall, scans, threats, IPs, and security posture." },
      { icon: Bell, title: "Alerts", desc: "Notifications for malware, attacks, lockouts, and critical findings." },
    ],
  },
];

const DetailedFeatures = () => {
  const [active, setActive] = useState("protection");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="bg-muted/50 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Deep Dive
          </p>
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
            All 17 features,{" "}
            <span className="font-serif-accent text-primary">explained.</span>
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="mx-auto mb-10 flex max-w-md justify-center gap-1 rounded-xl bg-background p-1 shadow-sm border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feature grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {current.features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DetailedFeatures;
