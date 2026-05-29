import { useEffect, useRef, useState, memo } from "react";

interface TechGrowthGraphProps {
  animate?: boolean;
}

export const TechGrowthGraph = memo(function TechGrowthGraph({ animate = true }: TechGrowthGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(animate);
  const [phase, setPhase] = useState<"drawing" | "done">("drawing");
  const [isPrepared, setIsPrepared] = useState(false);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animate && !visible) setVisible(true);
  }, [animate, visible]);

  useEffect(() => {
    if (!visible || phase === "done" || animatedRef.current) return;
    animatedRef.current = true;

    const startDelay = setTimeout(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const paths = svg.querySelectorAll<SVGPathElement>(".growth-draw");
      if (paths.length === 0) return;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      svg.getBoundingClientRect();
      setIsPrepared(true);

      requestAnimationFrame(() => {
        paths.forEach((path, i) => {
          path.style.transition = `stroke-dashoffset ${3.2 + i * 0.4}s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.25}s`;
          path.style.strokeDashoffset = "0";
        });
      });

      setTimeout(() => {
        paths.forEach((path) => {
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
          path.style.transition = "";
        });
        setPhase("done");
      }, 4800);
    }, 0);

    return () => clearTimeout(startDelay);
  }, [visible, phase]);

  if (!visible) return null;

  const isDone = phase === "done";

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ contain: "layout style paint" }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute top-[35%] md:top-[40%] right-[-15%] md:right-[-5%] lg:right-[0%] -translate-y-1/2 w-[280%] sm:w-[200%] md:w-[140%] lg:w-[95%] xl:w-[85%] h-auto opacity-[0.12] sm:opacity-[0.14] md:opacity-[0.12] lg:opacity-[0.1] ${isDone ? "growth-glow-loop" : ""}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ visibility: isPrepared || isDone ? "visible" : "hidden" }}
      >
        <defs>
          <linearGradient id="growth-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(260, 60%, 55%)" />
            <stop offset="50%" stopColor="hsl(230, 70%, 60%)" />
            <stop offset="100%" stopColor="hsl(280, 50%, 65%)" />
          </linearGradient>
          <linearGradient id="growth-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(240, 50%, 50%)" />
            <stop offset="50%" stopColor="hsl(270, 60%, 58%)" />
            <stop offset="100%" stopColor="hsl(220, 65%, 55%)" />
          </linearGradient>
          <linearGradient id="growth-grad-3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="hsl(250, 45%, 60%)" />
            <stop offset="100%" stopColor="hsl(290, 55%, 55%)" />
          </linearGradient>
          <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(250, 70%, 70%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(250, 70%, 70%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grid lines */}
        <g opacity="0.3">
          {[150, 250, 350, 450].map((y) => (
            <line key={`h-${y}`} x1="50" y1={y} x2="1150" y2={y} stroke="hsl(250, 30%, 50%)" strokeWidth="0.5" strokeDasharray="4 8" />
          ))}
          {[200, 400, 600, 800, 1000].map((x) => (
            <line key={`v-${x}`} x1={x} y1="100" x2={x} y2="550" stroke="hsl(250, 30%, 50%)" strokeWidth="0.5" strokeDasharray="4 8" />
          ))}
        </g>

        <path
          className="growth-draw"
          d="M 60 520 C 150 500, 200 480, 280 440 C 360 400, 400 380, 480 330 C 560 280, 620 250, 700 200 C 780 150, 850 130, 940 100 C 1000 80, 1060 60, 1140 40"
          stroke="url(#growth-grad-1)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          className="growth-draw"
          d="M 60 540 C 180 530, 250 510, 350 480 C 450 450, 520 420, 600 370 C 680 320, 740 290, 820 250 C 900 210, 960 190, 1060 160 C 1100 148, 1120 140, 1140 130"
          stroke="url(#growth-grad-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        <path
          className="growth-draw"
          d="M 60 550 C 200 545, 300 530, 450 510 C 600 490, 700 460, 850 410 C 950 378, 1050 340, 1140 300"
          stroke="url(#growth-grad-3)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Data points */}
        {[
          [280, 440],
          [480, 330],
          [700, 200],
          [940, 100],
          [1140, 40],
        ].map(([cx, cy], i) => (
          <g
            key={`dot-${i}`}
            style={{
              opacity: isDone ? 1 : 0,
              transition: `opacity 0.5s ease-out ${0.4 + i * 0.3}s`,
            }}
          >
            <circle cx={cx} cy={cy} r="12" fill="url(#dot-glow)" className={isDone ? "growth-dot-pulse" : ""} style={{ animationDelay: `${i * 0.6}s` }} />
            <circle cx={cx} cy={cy} r="3.5" fill="hsl(250, 70%, 70%)" stroke="hsl(260, 60%, 80%)" strokeWidth="1" />
          </g>
        ))}

        {/* Connection lines */}
        <g opacity="0.25">
          {[
            [280, 440, 480, 330],
            [480, 330, 700, 200],
            [700, 200, 940, 100],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`conn-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(260, 50%, 60%)"
              strokeWidth="0.8"
              strokeDasharray="3 6"
              style={{
                opacity: isDone ? 1 : 0,
                transition: `opacity 0.6s ease-out ${1.5 + i * 0.2}s`,
              }}
            />
          ))}
        </g>

        {/* Ambient dots */}
        {[
          [120, 490, 2], [350, 360, 1.5], [550, 290, 2], [750, 180, 1.5], [1050, 80, 2],
          [180, 420, 1], [620, 350, 1], [880, 160, 1.5], [430, 490, 1], [800, 300, 1],
        ].map(([cx, cy, r], i) => (
          <circle
            key={`ambient-${i}`}
            cx={cx} cy={cy} r={r}
            fill="hsl(250, 50%, 65%)"
            className={isDone ? "growth-ambient-pulse" : ""}
            style={{
              opacity: isDone ? undefined : 0,
              transition: `opacity 0.4s ease-out ${2 + i * 0.1}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
});
