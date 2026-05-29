import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="contato"
      className="py-24 sm:py-32 lg:py-48 relative overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 700px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_0%_8%/0.8),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={ref}
          className="max-w-4xl mx-auto text-center rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 md:p-16 lg:p-24 relative overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.99)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(40_10%_92%/0.04),transparent_50%)] pointer-events-none" />

          <span className="text-xs sm:text-sm md:text-base text-muted-foreground tracking-widest uppercase mb-6 sm:mb-8 block relative z-10">
            Pronto para começar?
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 sm:mb-8 md:mb-10 leading-[1.08] tracking-tight relative z-10">
            Faça seu negócio ser visto pelos clientes certos
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 md:mb-16 max-w-md sm:max-w-xl mx-auto leading-relaxed relative z-10">
            Entre em contato e descubra como podemos posicionar seu negócio,
            pagando pouco por mês.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 font-medium btn-contact-cta relative z-10"
          >
            <a
              href="https://whatsss.link/14oavw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5"
            >
              Falar pelo WhatsApp
              <ArrowRight size={18} />
            </a>
          </Button>

          <p className="text-xs sm:text-sm text-muted-foreground/60 mt-6 sm:mt-8 relative z-10">
            Resposta rápida · Sem compromisso
          </p>
        </div>
      </div>
    </section>
  );
}
