import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export function Navbar({ hidden = false }: { hidden?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 20;
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setIsScrolled(nextScrolled);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  const savedScrollRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      savedScrollRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, savedScrollRef.current);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-[10000]"
      style={{
        transition: "background-color 0.3s ease-out, border-color 0.3s ease-out, opacity 0.6s ease-out",
        backgroundColor: isOpen ? "hsl(var(--background))" : isScrolled ? "hsl(var(--background) / 0.82)" : "transparent",
        borderBottom: isScrolled && !isOpen ? "1px solid hsl(var(--border) / 0.55)" : "1px solid transparent",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, hsl(var(--background) / 0.88) 0%, hsl(var(--background) / 0.72) 100%)",
          opacity: isScrolled && !isOpen ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          className="flex items-center justify-between"
          style={{
            height: isScrolled ? "52px" : "64px",
            transition: "height 0.4s ease-out",
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 group">
            <img
              id="navbar-logo"
              src={logoIcon}
              alt="SILENCODE"
              className="w-auto object-contain"
              style={{
                height: isScrolled ? "48px" : "56px",
                transition: "height 0.4s ease-out",
              }}
            />
            <span
              className="text-foreground font-medium tracking-[0.05em] uppercase italic"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isScrolled ? "15px" : "17px",
                transition: "font-size 0.4s ease-out",
              }}
            >
              SILENCODE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-muted-foreground/70 hover:text-foreground transition-colors duration-300 rounded-full hover:bg-white/[0.04] font-sans"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="https://whatsss.link/14oavw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium tracking-wide rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(40_10%_92%/0.15)]"
            >
              Fale Conosco
              <ArrowRight size={13} strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-200"
            aria-label="Menu"
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </nav>
    {/* Mobile menu rendered via portal */}
    {isOpen && createPortal(
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-[9999] flex flex-col"
        style={{
          top: "64px",
          backgroundColor: "hsl(var(--background))",
        }}
      >

        {/* Menu items — animated entrance */}
        <div className="flex flex-col gap-1 px-6 pt-8 flex-1" style={{ animation: "mobile-menu-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors py-4 px-4 rounded-xl hover:bg-white/[0.04] min-h-[52px] flex items-center"
              style={{
                opacity: 0,
                animation: `mobile-menu-item 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + i * 0.06}s forwards`,
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            className="pt-6 px-1"
            style={{
              opacity: 0,
              animation: `mobile-menu-item 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + navLinks.length * 0.06}s forwards`,
            }}
          >
            <a
              href="https://whatsss.link/14oavw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 text-[15px] font-medium tracking-wide rounded-full bg-foreground text-background min-h-[48px] transition-colors duration-200 hover:bg-foreground/90"
            >
              Fale Conosco
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
