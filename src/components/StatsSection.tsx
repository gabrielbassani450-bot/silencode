import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "+150%", label: "Visibilidade digital" },
  { value: "Top 3", label: "Google Maps regional" },
  { value: "100%", label: "Sites responsivos" },
  { value: "24/7", label: "Presença online ativa" },
];

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-16 sm:py-24 lg:py-40 relative"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 300px",
        background: "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 3%) 100%)",
      }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-14 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.4s ease-out ${0.15 + index * 0.1}s, transform 0.4s ease-out ${0.15 + index * 0.1}s`,
              }}
            >
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight mb-2 sm:mb-3">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
