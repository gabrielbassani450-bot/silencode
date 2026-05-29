import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ScrollVideoSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="relative h-[50vh] sm:h-[70vh] lg:h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ contain: "layout style paint", contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}
    >
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_7%)_0%,hsl(0_0%_3%)_60%,hsl(0_0%_2%)_100%)]" />

      {/* Aurora waves */}
      <div className="sv-aurora" />

      {/* Twinkling stars */}
      <div className="sv-stars" />

      {/* Reduced meteors */}
      <div className="sv-meteor sv-meteor-1" />
      <div className="sv-meteor sv-meteor-2" />
      <div className="sv-meteor sv-meteor-3" />
      <div className="sv-meteor sv-meteor-4" />

      {/* Center glow */}
      <div className="sv-glow" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,hsl(0_0%_3%)_80%)]" />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 text-center px-5 sm:px-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground/60 mb-3 sm:mb-4">
          Silencode
        </p>
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight">
          Transformando sua
          <br />
          <span className="gradient-text inline-block pb-2 leading-[1.15]">presença digital</span>
        </h2>
      </div>
    </section>
  );
}
