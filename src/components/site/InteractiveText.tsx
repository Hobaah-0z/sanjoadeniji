import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

type Props = {
  text: string;
  className?: string;
};

export function InteractiveText({ text, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const letters = text.split("");

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
      onMouseMove={(e) => {
        const spans = containerRef.current?.querySelectorAll("[data-letter]");

        spans?.forEach((span) => {
          const rect = span.getBoundingClientRect();

          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);

          const distance = Math.sqrt(x * x + y * y);

          const strength = Math.max(0, 1 - distance / 180);

          span.animate(
            {
              transform: `translate(${-x * 0.08 * strength}px, ${-y * 0.08 * strength}px)`
            },
            {
              duration: 250,
              fill: "forwards",
              easing: "cubic-bezier(.22,1,.36,1)"
            }
          );
        });
      }}
      onMouseLeave={() => {
        const spans = containerRef.current?.querySelectorAll("[data-letter]");

        spans?.forEach((span) => {
          span.animate(
            {
              transform: "translate(0px,0px)"
            },
            {
              duration: 500,
              fill: "forwards",
              easing: "cubic-bezier(.22,1,.36,1)"
            }
          );
        });
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          data-letter
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}