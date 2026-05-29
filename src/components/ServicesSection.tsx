import { Globe, MapPin, Target, RefreshCw } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Globe,
    title: "Site Profissional",
    description: "Sua vitrine digital com design premium, responsivo e focado em atrair clientes.",
    number: "01",
  },
  {
    icon: MapPin,
    title: "Google Maps & SEO Local",
    description: "Posicione seu negócio no topo das buscas e seja encontrado pelos clientes da sua região.",
    number: "02",
  },
  {
    icon: Target,
    title: "Posicionamento Estratégico",
    description: "Destaque-se da concorrência com estratégias personalizadas para seu segmento e região.",
    number: "03",
  },
  {
    icon: RefreshCw,
    title: "Otimizações Semanais",
    description: "Evolução contínua com ajustes, melhorias e atualizações para manter seu negócio sempre visível.",
    number: "04",
  },
];

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="servicos"
      className="py-24 sm:py-32 lg:py-48 relative overflow-hidden"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 800px",
        background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 3.5%) 50%, hsl(0 0% 4%) 100%)",
      }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(0_0%_6%),transparent_70%)]" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div ref={ref}>
          {/* Header: centered on mobile/tablet, right-aligned on desktop */}
          <div
            className="max-w-3xl mx-auto lg:mx-0 lg:ml-auto text-center lg:text-right mb-14 sm:mb-16 lg:mb-28"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <span className="text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-4 sm:mb-5 block">
              Nossos Serviços
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.08] tracking-tight mb-4 sm:mb-6">
              Soluções completas para sua presença digital
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              Cada serviço foi pensado para trabalhar em conjunto, criando uma
              estrutura digital sólida e em constante evolução.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 sm:p-7 md:p-9 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-[0_8px_32px_-12px_hsl(0_0%_100%/0.06)] transition-all duration-400 relative overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.4s ease-out ${0.1 + index * 0.08}s, transform 0.4s ease-out ${0.1 + index * 0.08}s, background-color 0.4s, border-color 0.4s, box-shadow 0.4s`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(circle_at_50%_0%,hsl(40_10%_92%/0.03),transparent_60%)]" />

                <div className="flex items-start justify-between mb-5 sm:mb-7 relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.06] flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    <service.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground/50 font-mono">{service.number}</span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 relative z-10">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed relative z-10">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
