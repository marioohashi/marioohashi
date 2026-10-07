import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type DropProps = {
  children: ReactNode;
  rotate?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
};

// Pastes an element onto the page: it drops in from above and settles at its tilt.
export function Drop({ children, rotate = 0, delay = 0, className, inView = false }: DropProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion
    ? { opacity: 0, rotate }
    : { opacity: 0, y: -70, rotate: rotate + (rotate >= 0 ? 9 : -9), scale: 1.08 };
  const target = { opacity: 1, y: 0, rotate, scale: 1 };
  const transition = { type: 'spring' as const, stiffness: 140, damping: 15, delay };

  return (
    <motion.div
      className={className}
      initial={initial}
      {...(inView
        ? { whileInView: target, viewport: { once: true, margin: '0px 0px -12% 0px' } }
        : { animate: target })}
      whileHover={reduceMotion ? undefined : { rotate: 0, y: -6, scale: 1.02, zIndex: 20 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
