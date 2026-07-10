import { useRef, useEffect } from "react";

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // If the row can scroll horizontally, convert vertical wheel to horizontal
      if (el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    // Pointer drag-to-scroll (desktop + tablet). Skip touch — native scroll handles it.
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let pointerId: number | null = null;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (el.scrollWidth <= el.clientWidth) return;
      isDown = true;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3 && !moved) {
        moved = true;
        try {
          el.setPointerCapture(e.pointerId);
        } catch {}
      }
      if (moved) {
        e.preventDefault();
        el.scrollLeft = startScroll - dx;
      }
    };

    const endDrag = (e?: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = "";
      el.style.userSelect = "";
      if (moved && e) {
        // Swallow the click that follows a drag
        const stopClick = (ev: MouseEvent) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        el.addEventListener("click", stopClick, { capture: true, once: true });
      }
      if (pointerId !== null) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {}
        pointerId = null;
      }
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
    };
  }, []);

  return ref;
}
