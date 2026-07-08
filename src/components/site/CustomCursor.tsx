import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-all");

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("[data-cursor='view']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] rounded-full bg-foreground transition-[width,height] duration-300 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        width: hovering ? 96 : 10,
        height: hovering ? 96 : 10,
        transform: "translate(-50%, -50%)",
        mixBlendMode: hovering ? "normal" : "difference",
      }}
    >
      <span
        className="absolute inset-0 grid place-items-center text-[11px] uppercase tracking-widest text-background transition-opacity duration-200"
        style={{ opacity: hovering ? 1 : 0 }}
      >
        View
      </span>
    </div>
  );
}