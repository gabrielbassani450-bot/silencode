import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import logoSplash from "@/assets/logo-splash.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "move" | "exit">("enter");
  const completedRef = useRef(false);
  const [navLogoRect, setNavLogoRect] = useState<DOMRect | null>(null);

  const safeComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Poll for navbar logo element (rendered but hidden)
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const check = () => {
      if (cancelled) return;
      const el = document.getElementById("navbar-logo") as HTMLImageElement | null;
      if (el && el.complete && el.naturalWidth > 0) {
        setNavLogoRect(el.getBoundingClientRect());
        return;
      }
      if (el && !el.complete) {
        el.addEventListener("load", () => {
          if (!cancelled) setNavLogoRect(el.getBoundingClientRect());
        }, { once: true });
        setTimeout(() => {
          if (!cancelled && el) setNavLogoRect(el.getBoundingClientRect());
        }, 1000);
        return;
      }
      attempts++;
      if (attempts < 50) requestAnimationFrame(check);
    };
    check();
    return () => { cancelled = true; };
  }, []);

  // Phase transitions
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 1200),
      setTimeout(() => setPhase("move"), 2400),
      setTimeout(() => setPhase("exit"), 3600),
      setTimeout(safeComplete, 4300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [safeComplete]);

  const splashImgHeight = 140;
  const targetScale = navLogoRect ? navLogoRect.height / splashImgHeight : 0.4;
  const vpW = typeof window !== "undefined" ? window.innerWidth : 1920;
  const vpH = typeof window !== "undefined" ? window.innerHeight : 1080;
  const moveX = navLogoRect ? (navLogoRect.left + navLogoRect.width / 2) - vpW / 2 : -(vpW / 2 - 50);
  const moveY = navLogoRect ? (navLogoRect.top + navLogoRect.height / 2) - vpH / 2 : -(vpH / 2 - 32);

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex items-center justify-center"
      style={{ backgroundColor: "hsl(0 0% 3%)" }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (phase === "exit") safeComplete();
      }}
    >
      <motion.img
        src={logoSplash}
        alt="SILENCODE"
        style={{
          height: `${splashImgHeight}px`,
          width: "auto",
          position: "fixed",
          left: "50%",
          top: "50%",
        }}
        initial={{
          opacity: 0,
          scale: 0.7,
          x: "-50%",
          y: "-50%",
        }}
        animate={
          phase === "enter"
            ? { opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }
            : phase === "hold"
            ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
            : {
                opacity: phase === "exit" ? 0 : 1,
                scale: targetScale,
                x: `calc(-50% + ${moveX}px)`,
                y: `calc(-50% + ${moveY}px)`,
              }
        }
        transition={{
          duration: phase === "enter" || phase === "hold" ? 1.2 : 1.0,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.div>
  );
}
