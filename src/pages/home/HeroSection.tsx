import { useRef, useState } from 'react';
import tsuruIcon from '../../assets/tsuru-icon.png';
import { Arrow } from './Arrow';
import { Drop } from './Drop';
import { DraggableCard } from './DraggableCard';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [moved, setMoved] = useState(false);

  const markMoved = () => setMoved(true);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16" id="start" aria-label="Introduction">
      <img
        src="/mario-sketch-v2.webp"
        alt=""
        draggable={false}
        className="pointer-events-none absolute left-[50%] top-1/2 hidden w-[min(30vw,400px)] -translate-x-1/2 -translate-y-1/2 opacity-[.3] mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000_55%,transparent_95%)] lg:block"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12 lg:gap-7">
        {/* Bio */}
        <div className="relative md:col-span-6 lg:col-span-7 lg:row-span-2 lg:self-center">
          <p className="sb-mono sb-kicker">01 — START / CURITIBA, BR / {new Date().getFullYear()}</p>
          <h1 className="sb-headline">
            Hello there,
            <br />
            I&apos;m{' '}
            <span className="sb-underline">
              Mario Ohashi
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 14c40-10 90-12 150-6s100 2 142-4M20 21c60-6 150-8 250-2" />
              </svg>
            </span>
            <span className="sb-period">.</span>
          </h1>
          <p className="sb-lede">
            Full-stack developer with a designer&apos;s eye. I blend creative direction and
            engineering to build digital experiences that feel as good as they work.
          </p>
          <div className="sb-actions">
            {/* <a className="sb-btn sb-btn-ink" href="#projects">See the work <span aria-hidden="true">→</span></a>
            <a className="sb-btn" href={CV_URL} download>Download CV <span aria-hidden="true">↓</span></a> */}
          </div>
          <p className="sb-hand sb-annot mt-6">
            React · TypeScript · Node.js
            <Arrow className="sb-annot-arrow" />
          </p>
          <p className="sb-hand relative z-[9999] mt-4 hidden items-center gap-3 text-xl md:flex">
            drag the cards around ✋
            {moved && (
              <button
                type="button"
                className="sb-mono border border-slate-800 px-2.5 py-1 text-[11px] uppercase tracking-wider hover:bg-slate-900 hover:text-stone-100"
                onClick={() => {
                  setResetKey((key) => key + 1);
                  setMoved(false);
                }}
              >
                ↺ tidy up
              </button>
            )}
          </p>
        </div>

        {/* Landscape polaroid */}
        <DraggableCard label="Landscape polaroid" className="md:col-span-3 lg:col-span-5" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={-.5} delay={0.1}>
            <figure className="sb-polaroid !mr-auto max-w-xs md:!ml-auto md:!mr-0">
              <span className="sb-tape sb-tape-top" />
              <div className="sb-photo !aspect-[3/4]">
                <img
                  src="/mario-mountain.jpg"
                  alt="Mario on top of a mountain - Pico Paraná"
                  className="size-full object-cover"
                  draggable={false}
                />
              </div>
              <figcaption className="sb-hand">Pico Paraná, PR</figcaption>
            </figure>
          </Drop>
        </DraggableCard>

        {/* Wireframe polaroid */}
        <DraggableCard label="Wireframe polaroid" className="md:col-span-3 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.5} delay={0.25}>
            <figure className="sb-polaroid mr-auto max-w-sm lg:max-w-none">
              <span className="sb-tape sb-tape-left" />
              <div className="sb-photo sb-photo-ui !aspect-[5/4]" role="img" aria-label="Wireframe sketch of a web interface">
                <span className="wf-bar" />
                <span className="wf-hero" />
                <span className="wf-row"><i /><i /><i /></span>
                <span className="wf-line" />
                <span className="wf-line short" />
              </div>
              <figcaption className="sb-hand">wireframe v3</figcaption>
            </figure>
          </Drop>
        </DraggableCard>

        {/* Crane polaroid */}
        <DraggableCard label="Crane polaroid" className="md:col-span-3 lg:col-span-2" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={-0.5} delay={0.4}>
            <figure className="sb-polaroid mr-auto max-w-sm lg:max-w-none">
              <span className="sb-tape sb-tape-right" />
              <div className="sb-photo sb-photo-crane !aspect-[4/5] lg:!aspect-square">
                <img draggable={false} src={tsuruIcon} alt="Origami crane illustration" />
              </div>
              <figcaption className="sb-hand !text-lg">tsuru 鶴</figcaption>
            </figure>
          </Drop>
        </DraggableCard>

        {/* Code snippet */}
        <DraggableCard label="Code snippet" className="md:col-span-3 lg:col-span-5" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={.01} delay={0.5}>
            <pre className="sb-code !m-0 !max-w-none" aria-label="Code snippet describing Mario">
              <span className="sb-code-bar"><i /><i /><i /> mario.ts</span>
              <code>
                <span className="c-k">const</span> mario = {'{'}{'\n'}
                {'  '}role: <span className="c-s">&quot;Full Stack Developer&quot;</span>,{'\n'}
                {'  '}stack: [<span className="c-s">&quot;React&quot;</span>, <span className="c-s">&quot;TypeScript&quot;</span>, <span className="c-s">&quot;Node&quot;</span>],{'\n'}
                {'  '}background: <span className="c-s">&quot;Design + Code&quot;</span>,{'\n'}
                {'  '}available: <span className="c-k">true</span>,{'\n'}
                {'}'};
              </code>
            </pre>
          </Drop>
        </DraggableCard>

        {/* Sticky note */}
        <DraggableCard label="Sticky note" className="md:col-span-3 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.5} delay={0.6}>
            <div className="sb-sticky !static !w-full sb-hand">
              <span className="sb-tape sb-tape-top" />
              idea: design systems that don&apos;t feel like design systems ✎
            </div>
          </Drop>
        </DraggableCard>

        {/* Facts */}
        <DraggableCard label="Quick facts" className="md:col-span-6 lg:col-span-4" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.5} delay={0.7}>
            <ul className="sb-paper sb-mono grid h-full grid-cols-2 content-center gap-x-4 gap-y-3 !p-5 text-[12px] font-semibold uppercase tracking-wide" aria-label="Quick facts">
              <span className="sb-tape sb-tape-top" />
              <li>3 yrs ExxonMobil</li>
              <li>10 yrs creative studio</li>
              <li>EN · PT · ES</li>
              <li>Remote / Hybrid</li>
            </ul>
          </Drop>
        </DraggableCard>
      </div>
    </section>
  );
}
