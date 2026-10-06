import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const decor = [
  { top: '2%', left: '2%', speed: -90, rotate: 12, kind: 'compass' },
  { top: '30%', left: '1%', speed: -50, rotate: -8, kind: 'cross' },
  { top: '52%', right: '2%', speed: -120, rotate: 6, kind: 'scribble' },
  { top: '74%', left: '2%', speed: -70, rotate: -10, kind: 'compass' },
  { top: '90%', right: '6%', speed: -40, rotate: 4, kind: 'cross' },
] as const;

function Sketch({ kind }: { kind: (typeof decor)[number]['kind'] }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
  };

  if (kind === 'compass') {
    return (
      <svg viewBox="0 0 120 120" className="size-28" {...common}>
        <circle cx="60" cy="60" r="46" />
        <circle cx="60" cy="60" r="33" strokeDasharray="3 6" />
        <path d="M60 8v104M8 60h104M24 24l72 72" opacity=".5" />
      </svg>
    );
  }
  if (kind === 'cross') {
    return (
      <svg viewBox="0 0 80 80" className="size-16" {...common}>
        <path d="M40 6v68M6 40h68" />
        <circle cx="40" cy="40" r="10" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 60" className="h-14 w-36" {...common}>
      <path d="M6 40c18-30 30 20 48-4s26-26 44-2 30 14 56-14" />
      <path d="M6 52h148" strokeDasharray="2 7" />
    </svg>
  );
}

export function PaperLayers() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const slow = useTransform(scrollY, [0, 4000], [0, -160]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Layer 0: paper texture (tooth, fibers, stains, vignette) */}
      <svg className="absolute inset-0 size-full">
        <defs>
          <filter id="paper-tooth" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="4" seed="3" stitchTiles="stitch" result="n" />
            <feDiffuseLighting in="n" lightingColor="#fffdf6" surfaceScale="1.1" diffuseConstant="1.05">
              <feDistantLight azimuth="225" elevation="58" />
            </feDiffuseLighting>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1" />
          </filter>
          <filter id="paper-fibers" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".03 .08" numOctaves="4" seed="7" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .22  0 0 0 1.2 -.6" />
          </filter>
          <filter id="paper-stains" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".004" numOctaves="2" seed="11" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .45  0 0 0 0 .3  0 0 0 1.1 -.42" />
          </filter>
          <pattern id="paper-tooth-tile" width="320" height="320" patternUnits="userSpaceOnUse">
            <rect width="320" height="320" filter="url(#paper-tooth)" />
          </pattern>
          <pattern id="paper-fiber-tile" width="400" height="400" patternUnits="userSpaceOnUse">
            <rect width="400" height="400" filter="url(#paper-fibers)" />
          </pattern>
          <pattern id="paper-stain-tile" width="900" height="900" patternUnits="userSpaceOnUse">
            <rect width="900" height="900" filter="url(#paper-stains)" />
          </pattern>
          <radialGradient id="paper-light" cx="30%" cy="0%" r="90%">
            <stop offset="0" stopColor="#fffaf0" stopOpacity=".7" />
            <stop offset="1" stopColor="#d9d2c1" stopOpacity=".25" />
          </radialGradient>
          <radialGradient id="paper-vignette" cx="50%" cy="50%" r="75%">
            <stop offset=".6" stopColor="#6b5a3a" stopOpacity="0" />
            <stop offset="1" stopColor="#6b5a3a" stopOpacity=".22" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#paper-light)" />
        <rect width="100%" height="100%" fill="url(#paper-stain-tile)" opacity=".5" />
        <rect width="100%" height="100%" fill="url(#paper-tooth-tile)" style={{ mixBlendMode: 'multiply' }} opacity=".4" />
        <rect width="100%" height="100%" fill="url(#paper-fiber-tile)" opacity=".28" />
        <rect width="100%" height="100%" fill="url(#paper-vignette)" />
      </svg>

      {/* Layer 1: graphite construction grid and notebook margin */}
      <svg className="absolute inset-0 size-full text-slate-700/15">
        <defs>
          <pattern id="graphite-grid" width="80" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 31.5H80M79.5 0V32" stroke="currentColor" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#graphite-grid)" />
      </svg>
      <div className="absolute inset-y-0 left-[clamp(18px,4vw,56px)] w-px bg-slate-600/35" />

      {/* Layer 2: sketches with parallax */}
      <div className="absolute inset-0 hidden text-slate-600/25 md:block">
        {decor.map(({ kind, speed, rotate, ...position }, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              ...position,
              rotate,
              y: reduceMotion ? 0 : slow,
              scale: Math.abs(speed) / 80 + 0.5,
            }}
          >
            <Sketch kind={kind} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
