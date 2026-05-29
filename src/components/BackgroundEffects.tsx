// Removed unused framer-motion import

export function DigitalPulseWave() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden xl:block" aria-hidden="true" style={{ willChange: "transform", transform: "translateZ(0)" }}>
      <div className="digital-wave digital-wave-1" />
      <div className="digital-wave digital-wave-2" />
      <div className="digital-wave digital-wave-3" />
    </div>
  );
}


export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

export function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[100] opacity-[0.02] hidden xl:block"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.04) 1px, transparent 0)",
        backgroundRepeat: "repeat",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

export function Marquee() {
  const items = [
    "PRESENÇA DIGITAL",
    "SEO LOCAL",
    "GOOGLE MAPS",
    "SITE PREMIUM",
    "OTIMIZAÇÃO CONTÍNUA",
    "POSICIONAMENTO",
    "VISIBILIDADE",
    "RESULTADOS",
  ];

  return (
    <div className="relative overflow-hidden py-8 sm:py-10 border-y border-white/[0.04]">
      <div className="marquee-track flex gap-8 sm:gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-sm sm:text-base md:text-lg font-medium tracking-widest uppercase flex items-center gap-8 sm:gap-12 marquee-item"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/10 eco-glow-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function GlowLine() {
  return (
    <div className="relative w-full h-px overflow-hidden">
      <div className="glow-line-track" />
      <div className="absolute inset-0 bg-white/[0.04]" />
    </div>
  );
}
