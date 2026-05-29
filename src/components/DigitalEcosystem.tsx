import React, { useEffect, useRef, useState, useCallback } from "react";
import { Globe, MapPin, Search, BarChart3, Smartphone, Wifi } from "lucide-react";

/* ── Layout ── */
const CX = 50, CY = 50, RADIUS = 38;
const deg2rad = (d: number) => (d * Math.PI) / 180;
const nodePos = (angle: number) => ({
  x: CX + Math.cos(deg2rad(angle)) * RADIUS,
  y: CY + Math.sin(deg2rad(angle)) * RADIUS,
});

const hubNode = { id: "site", icon: Globe, label: "Site Premium", angle: 270 };

const peripheralNodes = [
  { id: "mobile", icon: Smartphone, label: "Mobile", angle: 330 },
  { id: "maps", icon: MapPin, label: "Google Maps", angle: 210 },
  { id: "analytics", icon: BarChart3, label: "Analytics", angle: 150 },
  { id: "seo", icon: Search, label: "SEO Local", angle: 90 },
  { id: "connect", icon: Wifi, label: "Conectividade", angle: 30 },
];

/* ── Timing (seconds) ── */
const NODE_DELAY = 0.18;
const NODE_ANIM = 0.35;
const LAST_PAUSE = 0.30;
const LIGHT_TRAVEL = 1.20;
const LINE_STAGGER = 0.18;
const REVEAL_ICON = 0.32;
const RING_ON = 0.28;
const RING_ROTATION = 8;

const nodesEnd = (peripheralNodes.length - 1) * NODE_DELAY + NODE_ANIM;
const linesStart = nodesEnd + LAST_PAUSE;
const linesEnd = linesStart + (peripheralNodes.length - 1) * LINE_STAGGER + LIGHT_TRAVEL;
const hubRevealStart = linesEnd + 0.20;
const hubRevealEnd = hubRevealStart + REVEAL_ICON;
const ringStart = hubRevealEnd + 0.05;
const ringEnd = ringStart + RING_ON;

/* ── Easing ── */
const easeAppear = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 3);
};

function getPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  let cx = mx + (CX - mx) * 0.35;
  let cy = my + (CY - my) * 0.35;
  const dx = Math.abs(from.x - to.x);
  if (dx < 3) cx = mx - 3;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

function approxPathLen(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.sqrt(dx * dx + dy * dy) * 1.15;
}

export const DigitalEcosystem = React.memo(function DigitalEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const onScreenRef = useRef(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const isCompact = typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      onScreenRef.current = e.isIntersecting;
      if (e.isIntersecting && !visible) setVisible(true);
    }, { threshold: 0.05, rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  const timeRef = useRef(0);
  const tick = useCallback((ts: number) => {
    rafRef.current = requestAnimationFrame(tick);
    if (!onScreenRef.current) return;

    if (startRef.current === null) startRef.current = ts;
    const newTime = (ts - startRef.current) / 1000;
    timeRef.current = newTime;
    setTime(newTime);
  }, []);

  useEffect(() => {
    if (!visible) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, tick]);

  const hubPos = nodePos(hubNode.angle);
  const done = time >= ringEnd;

  const hubRaw = Math.max(0, Math.min(1, (time - hubRevealStart) / REVEAL_ICON));
  const hubProg = easeAppear(hubRaw);
  const hubPulseT = Math.max(0, Math.min(1, (time - hubRevealStart) / REVEAL_ICON));
  const hubScale = hubProg > 0
    ? 0.98 + hubProg * 0.02 + (hubPulseT < 1 ? 0.03 * Math.sin(hubPulseT * Math.PI) : 0)
    : 0.98;

  const ringRaw = Math.max(0, Math.min(1, (time - ringStart) / RING_ON));
  const ringPulse = ringRaw > 0 && ringRaw < 1
    ? 1 + 0.06 * Math.sin(ringRaw * Math.PI)
    : 1;
  const breathe = done ? 1 - 0.04 * Math.sin(((time - ringEnd) / 6) * Math.PI * 2) : 1;

  const orbitSpeed = isMobile ? 12 : RING_ROTATION;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 900px",
        background: "linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 4.5%) 50%, hsl(0 0% 3%) 100%)",
      }}
    >
      {/* Subtle top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(260 40% 30% / 0.06), transparent 70%)",
      }} />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Left-aligned header for rhythm (contrast with centered About quote above) */}
        <div className="mb-14 sm:mb-18 md:mb-24 max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
            Ecossistema Integrado
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Presença digital que{" "}
            <span className="bg-gradient-to-r from-[hsl(260_60%_70%)] via-[hsl(230_60%_70%)] to-[hsl(280_50%_65%)] bg-clip-text text-transparent">
              conecta tudo
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-muted-foreground/50 max-w-md leading-relaxed">
            Cada ponto da sua presença online trabalha em sinergia para gerar resultados reais.
          </p>
        </div>

        <div className="relative mx-auto max-w-[85vw] sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" fill="none" style={{ willChange: "transform" }}>
            <defs>
              <linearGradient id="eco-orbit-grad" gradientUnits="userSpaceOnUse"
                x1={hubPos.x - 7} y1={hubPos.y} x2={hubPos.x + 7} y2={hubPos.y}>
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.03" />
                <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            <circle cx={CX} cy={CY} r={RADIUS + 4} stroke="hsl(260 50% 60%)" strokeWidth="0.12" fill="none" style={{ opacity: 0.08 }} />

            {peripheralNodes.map((node, i) => {
              const from = nodePos(node.angle);
              const path = getPath(from, hubPos);
              const nodeEnd = i * NODE_DELAY + NODE_ANIM;
              const baseOpacity = Math.max(0, Math.min(1, (time - nodeEnd) / 0.3)) * 0.14;
              return (
                <path key={`base-${node.id}`} d={path} stroke="hsl(260 30% 50%)" strokeWidth="0.2" strokeLinecap="round" fill="none" style={{ opacity: baseOpacity }} />
              );
            })}

            {peripheralNodes.map((node, i) => {
              const from = nodePos(node.angle);
              const path = getPath(from, hubPos);
              const len = approxPathLen(from, hubPos);
              const lightStart = linesStart + i * LINE_STAGGER;
              const lightProg = Math.max(0, Math.min(1, (time - lightStart) / LIGHT_TRAVEL));
              const eased = easeAppear(lightProg);
              const lightDone = time >= lightStart + LIGHT_TRAVEL;
              const lightOpacity = lightDone ? 0.55 : lightProg > 0 ? 0.2 + eased * 0.8 : 0;
              const pulseOffset = done ? ((time * 0.2 + i * 0.6) % 1) * len : 0;
              const flashStart = lightStart + LIGHT_TRAVEL * 0.88;
              const flashProg = Math.max(0, Math.min(1, (time - flashStart) / 0.12));

              return (
                <React.Fragment key={`light-${node.id}`}>
                  {lightProg > 0 && (
                    <path d={path} stroke="#8b5cf6" strokeWidth="0.5" strokeLinecap="round" fill="none"
                      style={{ strokeDasharray: len, strokeDashoffset: len * (1 - eased), opacity: lightOpacity }} />
                  )}
                  {flashProg > 0 && flashProg < 1 && (
                    <circle cx={hubPos.x} cy={hubPos.y} r={2.2 + flashProg * 1.2} fill="none" stroke="#8b5cf6" strokeWidth="0.18"
                      style={{ opacity: (1 - flashProg) * 0.6 }} />
                  )}
                  {done && (
                    <path d={path} stroke="#a78bfa" strokeWidth="0.55" strokeLinecap="round" fill="none"
                      style={{ strokeDasharray: `${len * 0.07} ${len * 0.93}`, strokeDashoffset: -pulseOffset, opacity: 0.25 }} />
                  )}
                </React.Fragment>
              );
            })}

            {ringRaw > 0 && (
              <>
                <circle cx={hubPos.x} cy={hubPos.y} r={6.5} fill="none" stroke="#8b5cf6" strokeWidth="0.3"
                  style={{ opacity: ringRaw * breathe * ringPulse * 0.25 }} />
                <g transform={`rotate(${(time * (360 / orbitSpeed)) % 360} ${hubPos.x} ${hubPos.y})`}>
                  <circle cx={hubPos.x + 6.5} cy={hubPos.y} r="0.8" fill="#8b5cf6"
                    style={{ opacity: ringRaw * breathe * 0.95 }} />
                  <path
                    d={`M ${hubPos.x + 6.5 * Math.cos(0)} ${hubPos.y + 6.5 * Math.sin(0)} A 6.5 6.5 0 0 0 ${hubPos.x + 6.5 * Math.cos(-Math.PI * 0.4)} ${hubPos.y + 6.5 * Math.sin(-Math.PI * 0.4)}`}
                    fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeLinecap="round"
                    style={{ opacity: ringRaw * breathe * 0.6 }} />
                </g>
              </>
            )}

            {ringRaw > 0 && (
              <circle cx={hubPos.x} cy={hubPos.y} r={6.5} fill="none" stroke="rgba(139,92,246,0.32)" strokeWidth="0.25"
                style={{ opacity: ringRaw * breathe * 0.5 }} />
            )}
          </svg>

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer"
            style={{ left: `${hubPos.x}%`, top: `${hubPos.y}%`, opacity: hubProg, transform: `translate(-50%, -50%) scale(${hubScale})`, zIndex: 30 }}
          >
            <div className="relative flex items-center justify-center rounded-full border w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-white/[0.08] bg-card/50 transition-all duration-500 group-hover/node:scale-110 group-hover/node:border-[hsl(260_50%_60%/0.4)]">
              <div className="absolute -inset-3 sm:-inset-4 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, rgba(139,92,246,${0.08 + hubProg * 0.15}), transparent 70%)`, opacity: hubProg }} />
              <Globe className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[hsl(260_60%_75%)] transition-colors duration-500" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 sm:mt-1.5 text-[10px] sm:text-xs md:text-sm tracking-wide whitespace-nowrap text-foreground/90 font-semibold"
              style={{ opacity: Math.min(hubProg, 1), top: '100%' }}>
              {hubNode.label}
            </span>
          </div>

          {peripheralNodes.map((node, i) => {
            const Icon = node.icon;
            const pos = nodePos(node.angle);
            const appearStart = i * NODE_DELAY;
            const raw = Math.max(0, Math.min(1, (time - appearStart) / NODE_ANIM));
            const prog = easeAppear(raw);
            const pulseStart = appearStart + NODE_ANIM;
            const pulseRaw = Math.max(0, Math.min(1, (time - pulseStart) / 0.2));
            const pulse = pulseRaw > 0 && pulseRaw < 1 ? 1 + 0.04 * Math.sin(pulseRaw * Math.PI) : 1;
            const scale = (0.95 + prog * 0.05) * pulse;

            return (
              <div key={node.id}
                className="absolute flex flex-col items-center gap-1 sm:gap-1.5 -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, opacity: prog, transform: `translate(-50%, calc(-50% + ${(1 - prog) * -6}px)) scale(${scale})`, zIndex: 20 }}>
                <div className="relative flex items-center justify-center rounded-full border w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 border-white/[0.06] bg-card/40 transition-all duration-500 group-hover/node:scale-110 group-hover/node:border-[hsl(260_50%_60%/0.35)] group-hover/node:bg-[hsl(260_40%_20%/0.15)]">
                  <div className="absolute -inset-2 sm:-inset-3 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(260 55% 65% / 0.12), transparent 70%)", opacity: prog }} />
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsl(260 60% 65% / 0.15), transparent 70%)" }} />
                  <Icon className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground/40 group-hover/node:text-[hsl(260_60%_75%)] transition-colors duration-500" />
                </div>
                <span className="text-[8px] sm:text-[10px] md:text-xs tracking-wide whitespace-nowrap text-muted-foreground/40 group-hover/node:text-[hsl(260_60%_75%/0.7)] transition-colors duration-500"
                  style={{ opacity: Math.min(prog, 0.9) }}>
                  {node.label}
                </span>
              </div>
            );
          })}

          <div className="absolute inset-[15%] sm:inset-[12%] rounded-full border border-white/[0.03] pointer-events-none" />
          <div className="absolute inset-[30%] sm:inset-[25%] rounded-full border border-dashed border-white/[0.02] pointer-events-none" />
        </div>
      </div>
    </section>
  );
});
