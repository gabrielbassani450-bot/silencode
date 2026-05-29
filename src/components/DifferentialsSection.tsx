import { Zap, MapPin, TrendingUp, Link } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GridBackground } from "@/components/BackgroundEffects";

const differentials = [
  {
    icon: Zap,
    title: "Estratégia Contínua",
    description: "Não apenas entregamos e vamos embora. Acompanhamos e evoluímos sua presença digital para você ser visto.",
  },
  {
    icon: MapPin,
    title: "Foco em Posicionamento Local",
    description: "Especialistas em fazer seu negócio ser encontrado pelos clientes que buscam seus serviços na região.",
  },
  {
    icon: TrendingUp,
    title: "Evolução Semanal",
    description: "Otimizações frequentes garantem que seu negócio esteja sempre visível e à frente da concorrência.",
  },
  {
    icon: Link,
    title: "Estrutura Integrada",
    description: "Site, Google Maps e estratégias de SEO trabalhando juntos para atrair mais clientes.",
  },
];

export function DifferentialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="diferenciais"
      className="py-24 sm:py-32 lg:py-48 relative overflow-hidden"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 800px",
        background: "linear-gradient(180deg, hsl(0 0% 3.5%) 0%, hsl(0 0% 4.5%) 50%, hsl(0 0% 3.5%) 100%)",
      }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* Animated background */}
      <div className="absolute inset-0 z-0" style={{ contain: "strict" }}>
        <div
          className="absolute w-[400px] h-[400px] rounded-full sm:w-[600px] sm:h-[600px] md:w-[900px] md:h-[900px]"
          style={{
            top: "-20%",
            left: "-15%",
            background: "radial-gradient(circle, hsla(220, 20%, 15%, 0.35) 0%, transparent 65%)",
            animation: "diff-float-1 18s ease-in-out infinite",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px]"
          style={{
            bottom: "-25%",
            right: "-10%",
            background: "radial-gradient(circle, hsla(260, 15%, 12%, 0.3) 0%, transparent 60%)",
            animation: "diff-float-2 22s ease-in-out infinite",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full sm:w-[400px] sm:h-[400px] md:w-[650px] md:h-[650px]"
          style={{
            top: "30%",
            left: "40%",
            background: "radial-gradient(circle, hsla(40, 12%, 10%, 0.25) 0%, transparent 55%)",
            animation: "diff-float-3 25s ease-in-out infinite",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: "linear-gradient(125deg, transparent 30%, hsla(40, 10%, 92%, 0.12) 45%, transparent 60%)",
            backgroundSize: "200% 200%",
            animation: "diff-sweep 12s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <GridBackground />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div ref={ref}>
          {/* Centered header */}
          <div
            className="mb-14 sm:mb-16 lg:mb-28 max-w-3xl mx-auto text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <span className="text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-4 sm:mb-5 block">
              Por que a SILENCODE
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.08] tracking-tight mb-4 sm:mb-6">
              Nossos diferenciais
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
              O que nos torna a escolha certa para negócios que querem ser vistos
              pelos clientes da sua região.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            {differentials.map((diff, index) => (
              <div
                key={index}
                className="group flex gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_8px_32px_-12px_hsl(0_0%_100%/0.05)] transition-all duration-400 relative overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.4s ease-out ${0.1 + index * 0.08}s, transform 0.4s ease-out ${0.1 + index * 0.08}s, background-color 0.4s, border-color 0.4s, box-shadow 0.4s`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(circle_at_0%_0%,hsl(40_10%_92%/0.04),transparent_50%)]" />

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:text-background group-hover:border-transparent transition-all duration-300 relative z-10">
                  <diff.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="relative z-10 min-w-0">
                  <h3 className="font-heading text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1.5 sm:mb-2.5">
                    {diff.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
