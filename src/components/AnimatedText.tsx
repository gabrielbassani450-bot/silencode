import { useState, useEffect, memo } from "react";

const phrases = ["Seja visto.", "Seja líder.", "Seja premium."];

export const AnimatedText = memo(function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];

    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentIndex]);

  return (
    <span className="inline">
      <span className="text-foreground">
        {displayText}
        <span
          className="inline-block w-[2px] sm:w-[3px] h-[0.8em] bg-foreground/80 ml-0.5 align-middle"
          style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
        />
      </span>
    </span>
  );
});
