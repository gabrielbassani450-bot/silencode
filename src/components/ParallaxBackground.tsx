import { useEffect, useRef, memo } from "react";

export const ParallaxBackground = memo(function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.opacity = window.innerWidth < 1024 ? "0.48" : "0.62";
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: "strict", transform: "translateZ(0)" }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 50% 45% at 15% 20%, hsla(220, 15%, 12%, 0.5) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 75% 60%, hsla(260, 12%, 10%, 0.4) 0%, transparent 65%),
            radial-gradient(ellipse 55% 50% at 45% 80%, hsla(40, 8%, 8%, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 50% 50%, hsla(0, 0%, 4%, 0.8) 0%, transparent 100%)
          `,
          transform: "translateZ(0)",
        }}
      />

      {/* Lightweight dot noise instead of SVG feTurbulence */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 50%) 0.5px, transparent 0)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsla(0, 0%, 2%, 0.4) 100%)",
        }}
      />
    </div>
  );
});
