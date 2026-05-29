import { Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GridBackground } from "@/components/BackgroundEffects";

const benefits = [
  "Estrutura digital profissional e estratégica",
  "Posicionamento local focado em resultados",
  "Evolução contínua com otimizações semanais",
  "Integração completa entre site e Google Maps",
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="sobre"
      className="py-24 sm:py-32 lg:py-48 relative overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
    >
      <GridBackground />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,hsl(0_0%_8%/0.5),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Header: stacked on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-24 items-start mb-14 sm:mb-16 lg:mb-28 text-center lg:text-center">
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              <span className="text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-4 sm:mb-5 block">
                Sobre a SILENCODE
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.08] tracking-tight">
                Sua empresa precisa ser encontrada
              </h2>
            </div>
            <div
              className="lg:pt-16"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
              }}
            >
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                A SILENCODE oferece o serviço digital estratégico, integrado, e em
                constante evolução. Não basta estar online — é preciso ser visto
                pelo seu cliente.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-14 sm:mb-16 lg:mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 md:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_4px_24px_-8px_hsl(0_0%_100%/0.04)] transition-all duration-400 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.4s ease-out ${0.15 + index * 0.08}s, transform 0.4s ease-out ${0.15 + index * 0.08}s`,
                }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-foreground font-medium leading-relaxed pt-1 sm:pt-1.5">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 md:p-14 relative overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s",
            }}
          >
            <span className="absolute top-4 left-6 text-5xl sm:text-6xl md:text-8xl font-serif text-white/[0.03] leading-none select-none">"</span>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground text-center italic leading-relaxed relative z-10 max-w-3xl mx-auto">
              "Construímos sua presença digital que evolui semanalmente,
              posicionando seu negócio entre as melhores referências a um custo
              acessível."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
