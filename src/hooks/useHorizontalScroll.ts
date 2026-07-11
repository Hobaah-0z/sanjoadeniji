import { useRef, useEffect } from "react";

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // rAF-driven smooth scroll: we animate `current` toward `target` with a
    // lerp. Wheel/keys/drag-inertia all just push `target`.
    let target = el.scrollLeft;
    let current = el.scrollLeft;
    let rafId: number | null = null;
    let lastFrame = performance.now();
    // Time-based smoothing constant (seconds). Lower = snappier, higher = silkier.
    // Framerate-independent via exponential smoothing.
    const SMOOTH_TAU = 0.11;
    const SPEED = 1.15; // wheel multiplier

    const getCards = (): HTMLElement[] => {
      const inner = el.querySelector<HTMLElement>(":scope > *");
      const source = inner ?? el;
      return Array.from(source.children) as HTMLElement[];
    };

    const nearestSnapLeft = (from: number) => {
      const cards = getCards();
      if (!cards.length) return from;
      const elLeft = el.getBoundingClientRect().left;
      let best = from;
      let bestDist = Infinity;
      for (const c of cards) {
        const cardLeft = el.scrollLeft + (c.getBoundingClientRect().left - elLeft);
        const d = Math.abs(cardLeft - from);
        if (d < bestDist) {
          bestDist = d;
          best = cardLeft;
        }
      }
      return best;
    };

    const maxScroll = () => el.scrollWidth - el.clientWidth;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.35) {
        current = target;
        el.scrollLeft = current;
        rafId = null;
        return;
      }
      // Framerate-independent exponential smoothing
      const alpha = 1 - Math.exp(-dt / SMOOTH_TAU);
      current += diff * alpha;
      el.scrollLeft = current;
      rafId = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (rafId == null) {
        lastFrame = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const setTarget = (next: number) => {
      target = Math.max(0, Math.min(maxScroll(), next));
      kick();
    };

    let wheelSnapTimer: number | undefined;
    // Once we hand off a gesture to vertical page scroll, stay handed off
    // until the wheel goes quiet — otherwise trailing momentum events
    // oscillate between horizontal capture and vertical scroll (jitter).
    let handoff = false;
    let lastWheelAt = 0;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;
      if (el.scrollWidth <= el.clientWidth) return;
      const now = performance.now();
      // Gesture ended (>140ms gap) — reset handoff so the next gesture
      // can capture the row again.
      if (now - lastWheelAt > 140) handoff = false;
      lastWheelAt = now;
      // Sync target to observed position if user interrupted an animation.
      if (rafId == null) {
        target = el.scrollLeft;
        current = el.scrollLeft;
      }
      // At the row's edge in the scroll direction? Let the page scroll
      // vertically to the next section instead of trapping the wheel.
      const atStart = target <= 0.5;
      const atEnd = target >= maxScroll() - 0.5;
      if (handoff || (delta < 0 && atStart) || (delta > 0 && atEnd)) {
        handoff = true;
        return; // don't preventDefault — native vertical scroll continues
      }
      e.preventDefault();
      setTarget(target + delta * SPEED);
      window.clearTimeout(wheelSnapTimer);
      wheelSnapTimer = window.setTimeout(() => {
        setTarget(nearestSnapLeft(target));
      }, 180);
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    // Pointer drag-to-scroll (desktop + tablet). Skip touch — native scroll handles it.
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let pointerId: number | null = null;
    let moved = false;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0; // px per ms

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (el.scrollWidth <= el.clientWidth) return;
      // Cancel any in-flight smooth animation so the grab feels instant.
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      current = el.scrollLeft;
      target = el.scrollLeft;
      isDown = true;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      lastX = e.clientX;
      lastT = performance.now();
      velocity = 0;
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
        const nextLeft = startScroll - dx;
        el.scrollLeft = nextLeft;
        current = nextLeft;
        target = nextLeft;
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0) {
          // Instantaneous velocity in px/ms (scroll direction is opposite of pointer)
          velocity = -((e.clientX - lastX) / dt);
        }
        lastX = e.clientX;
        lastT = now;
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
      if (moved) {
        // Inertial fling: project ~180ms of momentum, then snap to nearest card.
        const fling = velocity * 180;
        setTarget(nearestSnapLeft(el.scrollLeft + fling));
      }
    };

    el.style.cursor = "grab";
    // Let the browser handle vertical panning natively; we take over horizontal.
    const prevTouchAction = el.style.touchAction;
    el.style.touchAction = "pan-y";
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);

    // ---- Touch: bespoke swipe handling with edge handoff to page scroll ----
    let tActive = false;
    let tDecided: "h" | "v" | null = null;
    let tStartX = 0;
    let tStartY = 0;
    let tStartScroll = 0;
    let tLastX = 0;
    let tLastT = 0;
    let tVelocity = 0;
    let tId: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (el.scrollWidth <= el.clientWidth) return;
      const t = e.touches[0];
      tActive = true;
      tDecided = null;
      tId = t.identifier;
      tStartX = tLastX = t.clientX;
      tStartY = t.clientY;
      tStartScroll = el.scrollLeft;
      tLastT = performance.now();
      tVelocity = 0;
      // Cancel in-flight smoothing for an instant grab.
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      current = target = el.scrollLeft;
    };

    const getTouch = (e: TouchEvent) => {
      for (const t of Array.from(e.touches)) if (t.identifier === tId) return t;
      return null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tActive) return;
      const t = getTouch(e);
      if (!t) return;
      const dx = t.clientX - tStartX;
      const dy = t.clientY - tStartY;
      if (tDecided == null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Edge handoff: swiping further past an edge → let page scroll vertically.
          const atStart = el.scrollLeft <= 0.5;
          const atEnd = el.scrollLeft >= maxScroll() - 0.5;
          if ((dx > 0 && atStart) || (dx < 0 && atEnd)) {
            tDecided = "v";
            tActive = false;
            return;
          }
          tDecided = "h";
        } else {
          tDecided = "v";
          tActive = false;
          return;
        }
      }
      if (tDecided !== "h") return;
      if (e.cancelable) e.preventDefault();
      let nextLeft = tStartScroll - dx;
      // Rubber-band resistance beyond edges for a natural feel.
      const max = maxScroll();
      if (nextLeft < 0) nextLeft = nextLeft * 0.35;
      else if (nextLeft > max) nextLeft = max + (nextLeft - max) * 0.35;
      el.scrollLeft = nextLeft;
      current = target = nextLeft;
      const now = performance.now();
      const dt = now - tLastT;
      if (dt > 0) tVelocity = -((t.clientX - tLastX) / dt);
      tLastX = t.clientX;
      tLastT = now;

      // Mid-swipe edge overshoot → hand off remaining gesture to page scroll.
      if (nextLeft <= 0 && dx > 0) {
        tDecided = "v";
        tActive = false;
      } else if (nextLeft >= max && dx < 0) {
        tDecided = "v";
        tActive = false;
      }
    };

    const onTouchEnd = () => {
      if (tDecided === "h") {
        const fling = tVelocity * 180;
        setTarget(nearestSnapLeft(el.scrollLeft + fling));
      }
      tActive = false;
      tDecided = null;
      tId = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(wheelSnapTimer);
      if (rafId != null) cancelAnimationFrame(rafId);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.style.touchAction = prevTouchAction;
    };
  }, []);

  return ref;
}
