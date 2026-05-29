import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useCallback, useState } from "react";

/* ── Innovation → Results background canvas ── */
function InnovationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const lastFrameRef = useRef(0);
  const onScreenRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isCompact = typeof window !== "undefined" && window.innerWidth < 1280;

  useEffect(() => {
    const el = canvasRef.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      onScreenRef.current = e.isIntersecting;
      if (e.isIntersecting && !visible) setVisible(true);
    }, { threshold: 0.05, rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  const draw = useCallback((ts: number) => {
    rafRef.current = requestAnimationFrame(draw);
    const frameInterval = isCompact ? 50 : 33;
    if (ts - lastFrameRef.current < frameInterval) return;
    if (!onScreenRef.current) return;
    lastFrameRef.current = ts;

    if (!startRef.current) startRef.current = ts;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, isCompact ? 1.5 : 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const t = (ts - startRef.current) / 1000;
    ctx.clearRect(0, 0, w, h);

    const particleCount = isMobile ? 16 : isCompact ? 34 : 56;
    const lineCount = isMobile ? 6 : isCompact ? 12 : 18;
    const lineStep = isCompact ? 5 : 3;

    for (let i = 0; i < lineCount; i++) {
      const seed = i * 137.508;
      const baseY = (i / lineCount) * h;

      ctx.beginPath();
      const progress = i / lineCount;
      ctx.strokeStyle = `hsla(260, 55%, 65%, ${0.04 + progress * 0.03})`;
      ctx.lineWidth = 0.5 + progress * 0.3;

      for (let x = 0; x <= w; x += lineStep) {
        const normalX = x / w;
        const chaos = 1 - normalX;
        const amplitude = (20 + chaos * 30) * (1 - normalX * 0.6);
        const frequency = 0.003 + chaos * 0.004;
        const drift = Math.sin(t * 0.15 + seed) * 8 * chaos;

        const y = baseY
          + Math.sin(x * frequency + t * 0.2 + seed) * amplitude
          + Math.cos(x * frequency * 1.7 + t * 0.13 + seed * 0.5) * amplitude * 0.4 * chaos
          + drift;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    for (let i = 0; i < particleCount; i++) {
      const seed = i * 97.31;
      const baseX = ((Math.sin(seed) * 0.5 + 0.5) * w);
      const baseY = ((Math.cos(seed * 0.7) * 0.5 + 0.5) * h);
      const normalX = baseX / w;

      const chaos = 1 - normalX;
      const driftX = Math.sin(t * 0.1 + seed) * 15 * chaos + Math.cos(t * 0.07 + seed * 1.3) * 8 * chaos;
      const driftY = Math.cos(t * 0.12 + seed * 0.8) * 12 * chaos + Math.sin(t * 0.09 + seed * 1.5) * 6 * chaos;

      const gridSnapX = normalX > 0.7 ? Math.round(baseX / 30) * 30 : baseX;
      const gridSnapY = normalX > 0.7 ? Math.round(baseY / 30) * 30 : baseY;

      const x = gridSnapX + driftX * (normalX > 0.7 ? 0.15 : 1);
      const y = gridSnapY + driftY * (normalX > 0.7 ? 0.15 : 1);

      const radius = 1 + chaos * 1.2;
      const alpha = 0.08 + (1 - chaos) * 0.1;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(260, 60%, 70%, ${alpha})`;
      ctx.fill();

      if (normalX > 0.5 && !isMobile) {
        for (let j = i + 1; j < Math.min(i + 5, particleCount); j++) {
          const seed2 = j * 97.31;
          const bx2 = ((Math.sin(seed2) * 0.5 + 0.5) * w);
          const by2 = ((Math.cos(seed2 * 0.7) * 0.5 + 0.5) * h);
          const nx2 = bx2 / w;
          if (nx2 < 0.5) continue;

          const chaos2 = 1 - nx2;
          const dx2 = Math.sin(t * 0.1 + seed2) * 15 * chaos2;
          const dy2 = Math.cos(t * 0.12 + seed2 * 0.8) * 12 * chaos2;
          const gx2 = nx2 > 0.7 ? Math.round(bx2 / 30) * 30 : bx2;
          const gy2 = nx2 > 0.7 ? Math.round(by2 / 30) * 30 : by2;
          const x2 = gx2 + dx2 * (nx2 > 0.7 ? 0.15 : 1);
          const y2 = gy2 + dy2 * (nx2 > 0.7 ? 0.15 : 1);

          const dist = Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `hsla(260, 55%, 65%, ${(1 - dist / 80) * 0.06})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
    }

    if (!isMobile) {
      for (let i = 0; i < 6; i++) {
        const seed = i * 53.7;
        const cx = w * 0.65 + (Math.sin(seed) * 0.3 * w);
        const cy = h * 0.2 + (Math.cos(seed * 0.6) * 0.6 * h);
        const size = 15 + i * 5;
        const rotation = t * 0.03 + seed;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.strokeStyle = `hsla(260, 50%, 60%, 0.04)`;
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.stroke();
        ctx.restore();
      }
    }
  }, [isCompact, isMobile]);

  useEffect(() => {
    if (!visible) return;
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

export function AuroraSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden flex items-center justify-center" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}>
      <InnovationCanvas />

      <div className="absolute inset-0 aurora-container">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {[20, 40, 60, 80].map((pos) => (
          <div
            key={`h-${pos}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${pos}%`,
              background: "linear-gradient(90deg, transparent, hsl(40 10% 92% / 0.08), transparent)",
            }}
          />
        ))}
      </div>

      <div
        ref={ref}
        className="relative z-10 text-center px-5 sm:px-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <p
          className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground/50 mb-4 sm:mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease-out 0.15s, transform 0.5s ease-out 0.15s",
          }}
        >
          Tecnologia & Design
        </p>
        <h2
          className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease-out 0.25s, transform 0.5s ease-out 0.25s",
          }}
        >
          Onde a inovação
          <br />
          <span className="gradient-text">encontra resultados</span>
        </h2>
      </div>
    </section>
  );
}
