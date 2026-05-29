import { forwardRef } from "react";
import { Mail, Phone, Instagram } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/silencode/", label: "Instagram" },
];

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer ref={ref} className="py-12 sm:py-16 lg:py-20 border-t border-white/[0.06]">
      <div
        ref={animRef}
        className="container mx-auto px-5 sm:px-8 lg:px-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        {/* Top: Logo + Slogan */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <a href="#" className="flex items-center gap-2 mb-6 sm:mb-8">
            <img src={logoIcon} alt="SILENCODE" className="h-6 sm:h-7 w-auto object-contain" />
            <span
              className="text-foreground font-medium tracking-[0.05em] text-xs sm:text-sm uppercase italic"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              SILENCODE
            </span>
          </a>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold italic text-muted-foreground/30 leading-[1.15] tracking-tight">
              Seja visto.
            </p>
            <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold italic text-muted-foreground/30 leading-[1.15] tracking-tight">
              Seja líder.
            </p>
            <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold italic text-muted-foreground/30 leading-[1.15] tracking-tight">
              Seja premium.
            </p>
          </div>
        </div>

        {/* Bottom: 3-column layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 mb-10 sm:mb-14">
          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground/60 mb-4 sm:mb-5 uppercase tracking-widest">
              Navegação
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground/60 mb-4 sm:mb-5 uppercase tracking-widest">
              Contato
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <a
                  href="https://whatsss.link/14oavw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} SILENCODE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});
