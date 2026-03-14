import { SiInstagram, SiTiktok, SiX, SiYoutube } from "react-icons/si";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { Icon: SiInstagram, href: "#", label: "Instagram" },
  { Icon: SiX, href: "#", label: "X (Twitter)" },
  { Icon: SiTiktok, href: "#", label: "TikTok" },
  { Icon: SiYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/zen-logo-transparent.dim_300x120.png"
              alt="ZEN Store"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Anime-inspired streetwear for those who carry the warrior spirit.
              <br />
              <span className="font-japanese">禅 — 魂を着る</span>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display tracking-widest text-sm text-foreground mb-4">
              NAVIGATE
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-display tracking-widest text-sm text-foreground mb-4">
              FOLLOW US
            </h4>
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.50 0.22 27 / 0.5), transparent)",
          }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {year} ZEN STORE. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
