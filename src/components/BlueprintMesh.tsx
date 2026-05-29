import { useEffect, useRef, memo, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

const NODE_COUNT_DESKTOP = 18;
const NODE_COUNT_MOBILE = 10;
const CONNECTION_DIST = 0.12;
const NODE_RADIUS = 1;
const LINE_ALPHA = 0.03;
const NODE_ALPHA = 0.06;
const DRIFT_SPEED = 0.02;
const DRIFT_RANGE = 10;

export const BlueprintMesh = memo(function BlueprintMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const scrollRef = useRef(0);
  const visibleRef = useRef(true);
  const scrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const initNodes = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const count = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    // Keep this effect only on wide desktop screens for smoother scrolling
    if (window.innerWidth < 1280) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) initNodes(w, h);
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollingRef.current = true;
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
      }, 120);
    };

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };

    // Also pause when scrolled far — use IntersectionObserver concept not needed for fixed canvas
    // Already throttled to 30fps which is good

    resize();
    onScroll();
    startTimeRef.current = performance.now();

    let lastFrame = 0;
    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw);

      // Throttle heavily and pause during active scroll to protect scroll smoothness
      if (now - lastFrame < 55) return;
      if (!visibleRef.current || scrollingRef.current) return;
      lastFrame = now;

      const elapsed = now - startTimeRef.current;
      const fadeIn = Math.min(1, elapsed / 3000);
      const scrollProg = scrollRef.current;
      const scrollMod = 0.5 + 0.5 * Math.sin(scrollProg * Math.PI * 2);
      const masterAlpha = fadeIn * (0.3 + scrollMod * 0.7);

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const diagSq = w * w + h * h;
      const maxDistSq = CONNECTION_DIST * CONNECTION_DIST * diagSq;
      const scrollOffsetY = scrollProg * 20;

      for (const node of nodes) {
        node.x += node.vx * DRIFT_SPEED;
        node.y += node.vy * DRIFT_SPEED;
        const dx = node.x - node.baseX;
        const dy = node.y - (node.baseY + scrollOffsetY);
        if (Math.abs(dx) > DRIFT_RANGE) node.vx *= -1;
        if (Math.abs(dy) > DRIFT_RANGE) node.vy *= -1;
        node.vx += (Math.random() - 0.5) * 0.008;
        node.vy += (Math.random() - 0.5) * 0.008;
        node.vx = Math.max(-1, Math.min(1, node.vx));
        node.vy = Math.max(-1, Math.min(1, node.vy));
      }

      // Batch draw connections with single style set
      ctx.lineWidth = 0.4;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ddx = nodes[i].x - nodes[j].x;
          const ddy = nodes[i].y - nodes[j].y;
          const distSq = ddx * ddx + ddy * ddy;
          if (distSq < maxDistSq) {
            const alpha = LINE_ALPHA * masterAlpha * (1 - distSq / maxDistSq);
            ctx.strokeStyle = `hsla(260,12%,30%,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Batch draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(260,10%,40%,${NODE_ALPHA * masterAlpha})`;
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] hidden xl:block"
      style={{ contain: "strict", willChange: "transform", transform: "translateZ(0)" }}
      aria-hidden="true"
    />
  );
});
