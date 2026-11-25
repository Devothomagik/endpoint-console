import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is it compatible with all Compute Engine VMs?",
    a: "Yes. CyberCloud Extreme Defender supports all VM instance types, operating systems, and configurations on Google Cloud Compute Engine.",
  },
  {
    q: "How long does setup take?",
    a: "Minutes. After purchasing, link your Google Cloud account through our guided wizard and protection activates immediately.",
  },
  {
    q: "Is this a one-time payment or subscription?",
    a: "One-time payment of $399 USD. No recurring charges, no hidden fees.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards (Visa, Mastercard, Amex, Discover) processed through our PCI-compliant payment provider.",
  },
  {
    q: "Do I get a receipt?",
    a: "Yes. After purchase you'll receive a downloadable PDF receipt with your transaction details.",
  },
  {
    q: "Can I protect multiple VMs?",
    a: "Yes. The centralized dashboard lets you manage security across all your Compute Engine VMs from one interface.",
  },
  {
    q: "Is there a refund policy?",
    a: "If you're unsatisfied within 30 days, contact our support team and we'll work to make it right.",
  },
];

const FAQSection = () => (
  <section id="faq" className="bg-muted/50 py-20 lg:py-28">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          FAQ
        </p>
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          Common{" "}
          <span className="font-serif-accent text-primary">questions.</span>
        </h2>
      </div>

      <div className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border bg-card px-5"
            >
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
