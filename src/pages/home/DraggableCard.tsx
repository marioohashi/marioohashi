import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode, RefObject } from 'react';

type DraggableCardProps = {
  children: ReactNode;
  label: string;
  boundsRef: RefObject<HTMLElement | null>;
  resetKey: number;
  className?: string;
  onMove?: () => void;
};

const STEP = 16;
const BIG_STEP = 64;
const DESKTOP_QUERY = '(min-width: 768px)';

let topLayer = 10;

function useCanDrag() {
  const [canDrag, setCanDrag] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setCanDrag(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return canDrag;
}

export function DraggableCard({
  children,
  label,
  boundsRef,
  resetKey,
  className,
  onMove,
}: DraggableCardProps) {
  const canDrag = useCanDrag();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const zIndex = useMotionValue(1);
  const [dragging, setDragging] = useState(false);
  const limits = useRef({ left: 0, right: 0, top: 0, bottom: 0 });
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const spring = { type: 'spring' as const, stiffness: 160, damping: 18 };
    const controls = [animate(x, 0, spring), animate(y, 0, spring)];
    return () => controls.forEach((control) => control.stop());
  }, [resetKey, x, y]);

  const bringToFront = () => {
    topLayer += 1;
    zIndex.set(topLayer);
  };

  // Measured at the start of each drag: layout shifts after mount (fonts, resize) would leave stale bounds.
  const measureLimits = () => {
    const bounds = boundsRef.current?.getBoundingClientRect();
    if (!bounds || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    limits.current = {
      left: x.get() + bounds.left - rect.left,
      right: x.get() + bounds.right - rect.right,
      top: y.get() + bounds.top - rect.top,
      bottom: y.get() + bounds.bottom - rect.bottom,
    };
  };

  const clampToBounds = () => {
    const { left, right, top, bottom } = limits.current;
    x.set(Math.min(Math.max(x.get(), left), right));
    y.set(Math.min(Math.max(y.get(), top), bottom));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const direction = directions[event.key];
    if (!direction || !ref.current) return;

    event.preventDefault();
    const step = event.shiftKey ? BIG_STEP : STEP;
    let dx = direction[0] * step;
    let dy = direction[1] * step;

    const bounds = boundsRef.current?.getBoundingClientRect();
    const rect = ref.current.getBoundingClientRect();
    if (bounds) {
      dx = Math.min(Math.max(dx, bounds.left - rect.left), bounds.right - rect.right);
      dy = Math.min(Math.max(dy, bounds.top - rect.top), bounds.bottom - rect.bottom);
    }

    bringToFront();
    x.set(x.get() + dx);
    y.set(y.get() + dy);
    onMove?.();
  };

  if (!canDrag) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className ?? ''} touch-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900`}
      style={{ x, y, zIndex }}
      drag
      dragElastic={0}
      dragMomentum={false}
      onPointerDown={bringToFront}
      onDragStart={() => {
        measureLimits();
        setDragging(true);
        onMove?.();
      }}
      onDrag={clampToBounds}
      onDragEnd={() => setDragging(false)}
      whileDrag={{ scale: 1.04, filter: 'drop-shadow(0 18px 20px rgba(20, 24, 30, .3))' }}
      tabIndex={0}
      role="group"
      aria-roledescription="draggable card"
      aria-label={`${label}. Drag with the mouse, or use the arrow keys to move it. Hold Shift to move faster.`}
      onKeyDown={handleKeyDown}
    >
      {children}
    </motion.div>
  );
}
