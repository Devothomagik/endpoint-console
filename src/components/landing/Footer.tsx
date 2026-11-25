import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Shield className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">CyberCloud</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          <a href="#" className="transition-colors hover:text-foreground">Contact</a>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} CyberCloud Extreme Defender. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
