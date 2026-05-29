import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedText } from "@/components/AnimatedText";
import { GridBackground } from "@/components/BackgroundEffects";
import { TechGrowthGraph } from "@/components/TechGrowthGraph";

export function HeroSection({ graphReady = true }: { graphReady?: boolean }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center pt-12 sm:pt-16 md:pt-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_8%),hsl(0_0%_3%)_70%)]" />
      <GridBackground />
      <TechGrowthGraph animate={graphReady} />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={ref}
          className="max-w-xl sm:max-w-2xl lg:max-w-2xl xl:max-w-3xl text-left"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >

          {/* Heading */}
          <h1
            className="font-heading text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 md:mb-8 tracking-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
            }}
          >
            <span className="block text-foreground min-h-[1.15em]"><AnimatedText /></span>
            <span className="block text-muted-foreground/70 mt-3 text-[1.5rem] sm:text-[1.75rem] md:text-3xl lg:text-[2.75rem] font-medium">Pague pouco.</span>
            <span className="block text-foreground mt-3 text-[1.75rem] sm:text-[2rem] md:text-4xl lg:text-5xl font-semibold">Cresça todo mês.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-md sm:max-w-xl leading-relaxed font-normal"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease-out 0.35s, transform 0.5s ease-out 0.35s",
            }}
          >
            Sites profissionais, presença no Google e otimizações estratégicas para empresas que querem crescer.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease-out 0.45s, transform 0.5s ease-out 0.45s",
            }}
          >
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 font-medium btn-contact-primary"
            >
              <a
                href="https://whatsss.link/14oavw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5"
              >
                Fale com um especialista
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/[0.12] hover:bg-white/[0.04] hover:border-white/[0.2] rounded-full text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 text-foreground btn-contact-secondary"
            >
              <a href="#servicos">Conhecer serviços</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 opacity-60">
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent scroll-indicator" />
      </div>
    </section>
  );
}
