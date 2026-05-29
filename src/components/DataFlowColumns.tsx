import { useEffect, useRef, memo } from "react";

interface Column {
  x: number;
  segments: { y: number; speed: number; len: number; alpha: number }[];
  delay: number;
}

const COL_COUNT_DESKTOP = 10;
const COL_COUNT_MOBILE = 4;
const SEGMENTS_PER_COL = 3;
const SEG_WIDTH = 1;

export const DataFlowColumns = memo(function DataFlowColumns() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const columnsRef = useRef<Column[]>([]);
  const startRef = useRef(0);
  const visibleRef = useRef(true);
  const scrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Keep this effect only on wide desktop screens for smoother scrolling
    if (window.innerWidth < 1280) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? COL_COUNT_MOBILE : COL_COUNT_DESKTOP;
      const spacing = w / (count + 1);
      const cols: Column[] = [];

      for (let i = 0; i < count; i++) {
        const segments = [];
        for (let s = 0; s < SEGMENTS_PER_COL; s++) {
          segments.push({
            y: Math.random() * h,
            speed: 0.12 + Math.random() * 0.25,
            len: 12 + Math.random() * 25,
            alpha: 0.02 + Math.random() * 0.04,
          });
        }
        cols.push({
          x: spacing * (i + 1) + (Math.random() - 0.5) * spacing * 0.4,
          segments,
          delay: i * 0.15,
        });
      }
      columnsRef.current = cols;
    };

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };

    const onScroll = () => {
      scrollingRef.current = true;
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
      }, 120);
    };

    init();
    startRef.current = performance.now();

    let lastFrame = 0;
    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);

      // Throttle heavily and pause during active scroll to protect scroll smoothness
      if (now - lastFrame < 55) return;
      if (!visibleRef.current || scrollingRef.current) return;
      lastFrame = now;

      const elapsed = (now - startRef.current) / 1000;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = SEG_WIDTH;

      for (const col of columnsRef.current) {
        const colAlpha = Math.min(1, Math.max(0, (elapsed - col.delay) / 1.5));
        if (colAlpha <= 0) continue;

        for (const seg of col.segments) {
          seg.y += seg.speed;
          if (seg.y > h + seg.len) seg.y = -seg.len;

          const a = seg.alpha * colAlpha;

          // Use simpler solid color with varying alpha instead of gradient per-segment
          const midY = seg.y + seg.len * 0.5;
          ctx.strokeStyle = `hsla(260,10%,32%,${a})`;
          ctx.beginPath();
          ctx.moveTo(col.x, seg.y + seg.len * 0.15);
          ctx.lineTo(col.x, seg.y + seg.len * 0.85);
          ctx.stroke();

          // Faded endpoints
          ctx.strokeStyle = `hsla(260,10%,32%,${a * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(col.x, seg.y);
          ctx.lineTo(col.x, seg.y + seg.len * 0.15);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(col.x, seg.y + seg.len * 0.85);
          ctx.lineTo(col.x, seg.y + seg.len);
          ctx.stroke();
        }
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", init, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("resize", init);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] hidden xl:block"
      style={{ contain: "strict", willChange: "transform", transform: "translateZ(0)" }}
      aria-hidden="true"
    />
  );
});
