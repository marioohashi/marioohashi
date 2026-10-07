import { useRef, useState } from 'react';
import tsuruIcon from '../../assets/tsuru-icon.png';
import { Arrow } from './Arrow';
import { Drop } from './Drop';
import { DraggableCard } from './DraggableCard';
import { RANDOM_NOTES } from "./data"
import PLAYLIST_DATA from "../../assets/songs.json";

export interface Song {
  "Track URI": string;
  "ISRC": string;
  "Track Name": string;
  "Album Name": string;
  "Artist Name(s)": string;
  "Release Date": string;
  "Duration (ms)": number;
  "Popularity": number;
  "Explicit": boolean;
  "Added By": number;
  "Added At": string;
  "Genres": string;
  "Record Label": string;
  "Danceability": number;
  "Energy": number;
  "Key": number;
  "Loudness": number;
  "Mode": number;
  "Speechiness": number;
  "Acousticness": number;
  "Instrumentalness": number;
  "Liveness": number;
  "Valence": number;
  "Tempo": number;
  "Time Signature": number;
}

const typedPlaylist: Song[] = PLAYLIST_DATA as Song[];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [resetKey, setResetKey] = useState(0);
  const [moved, setMoved] = useState(false);

  const markMoved = () => setMoved(true);

  const [randomNote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_NOTES.length);
    return RANDOM_NOTES[randomIndex];
  });

  const [currentSong] = useState<Song>(() => {
    const filteredList = typedPlaylist.filter(song => song.Popularity > 80 && !song.Explicit);
    const listToUse = filteredList.length > 0 ? filteredList : typedPlaylist;

    const randomIndex = Math.floor(Math.random() * listToUse.length);
    return listToUse[randomIndex];
  });

  return (
    <section ref={sectionRef} className="relative py-8 md:py-16" id="start" aria-label="Introduction">
      <img
        src="/mario-sketch-v2.webp"
        alt=""
        draggable={false}
        className="pointer-events-none absolute left-[50%] top-1/2 hidden w-[min(30vw,400px)] -translate-x-1/2 -translate-y-1/2 opacity-[.3] mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000_55%,transparent_95%)] lg:block"
      />

      {/* Grade Cartesiana Principal: 1 coluna no mobile, 12 colunas no desktop */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-6 lg:grid-cols-12 lg:gap-6 items-start">

        {/* Bio */}
        <div className="relative md:col-span-6 lg:col-span-6">
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
          <p className="sb-hand sb-annot mt-4">
            React · TypeScript · Node.js
            <Arrow className="sb-annot-arrow" />
          </p>
          <p className="sb-hand relative z-[9999] mt-3 hidden items-center gap-3 text-lg md:flex">
            drag the cards around ✋
            {moved && (
              <button
                type="button"
                className="sb-mono border border-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wider hover:bg-slate-900 hover:text-stone-100"
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

        {/* Crane polaroid (Topo Direita) */}
        <DraggableCard label="Crane polaroid" className="md:col-span-3 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={-0.5} delay={0.4}>
            <figure className="sb-polaroid mx-auto max-w-xs lg:max-w-none">
              <span className="sb-tape sb-tape-right" />
              <div className="sb-photo sb-photo-crane aspect-[4/5] lg:aspect-square">
                <img draggable={false} src={tsuruIcon} alt="Origami crane illustration" />
              </div>
              <figcaption className="sb-hand text-base">tsuru 鶴</figcaption>
            </figure>
          </Drop>
        </DraggableCard>

        {/* Landscape polaroid (Topo Direita) */}
        <DraggableCard label="Landscape polaroid" className="md:col-span-3 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={-0.5} delay={0.1}>
            <figure className="sb-polaroid mx-auto max-w-xs lg:max-w-none">
              <span className="sb-tape sb-tape-top" />
              <div className="sb-photo aspect-[3/4]">
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

        <DraggableCard label="Now Playing block" className="md:col-span-4 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.4} delay={0.8}>
            <a
              href={`https://open.spotify.com/track/${currentSong["Track URI"].split(":")[2]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sb-paper sb-sticky !static mx-auto w-full max-w-xs lg:max-w-none sb-hand flex flex-col justify-between p-5 bg-stone-50/90 border border-stone-200 group block transition-transform hover:scale-[1.02]"
              title="Ouvir no Spotify"
            >
              <span className="sb-tape sb-tape-right" />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="sb-mono text-[10px] uppercase tracking-wider text-stone-500 block">🎵 now playing</span>

                  {/* Ícone de Play com destaque ao passar o rato */}
                  <span className="flex items-center justify-center size-7 rounded-full bg-stone-900 text-stone-100 group-hover:bg-emerald-600 transition-colors shadow-sm">
                    <svg className="size-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <p className="text-lg font-bold text-stone-800 leading-snug group-hover:text-emerald-700 transition-colors">{currentSong["Track Name" as keyof Song]}</p>
                <p className="text-sm text-stone-600 mt-1">{currentSong["Artist Name(s)" as keyof Song]}</p>
              </div>
              <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden mt-4">
                <div className="bg-stone-800 group-hover:bg-emerald-600 h-full w-2/3 animate-pulse transition-colors" />
              </div>
            </a>
          </Drop>
        </DraggableCard>


        <DraggableCard label="Dynamic note" className="md:col-span-4 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.5} delay={0.6}>
            <div className="sb-sticky !static mx-auto w-full max-w-xs lg:max-w-none sb-hand flex flex-col justify-center p-5 bg-amber-50/90 text-stone-900 shadow-sm">
              <span className="sb-tape sb-tape-top" />
              <p className="text-base sm:text-lg leading-relaxed">{randomNote}</p>
            </div>
          </Drop>
        </DraggableCard>

        {/* Quick Facts */}
        <DraggableCard label="Quick facts" className="md:col-span-4 lg:col-span-2" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={-0.3} delay={0.7}>
            <ul className="sb-paper sb-mono grid h-full grid-cols-1 content-center gap-x-4 gap-y-2 !p-4 text-[11px] font-semibold uppercase tracking-wide mx-auto max-w-xs lg:max-w-none aspect-square" aria-label="Quick facts">
              <span className="sb-tape sb-tape-left" />
              <li>3 yrs ExxonMobil</li>
              <li>10 yrs creative studio</li>
              <li>EN · PT · ES</li>
              <li>Remote / Hybrid</li>
            </ul>
          </Drop>
        </DraggableCard>

        <DraggableCard label="Code snippet" className="md:col-span-6 lg:col-span-4" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.01} delay={0.5}>
            <pre className="sb-code !m-0 !max-w-none mx-auto max-w-md lg:max-w-none h-full flex flex-col justify-center text-xs sm:text-sm p-4" aria-label="Code snippet describing Mario">
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



        {/* <DraggableCard label="Wireframe polaroid" className="md:col-span-6 lg:col-span-3" boundsRef={sectionRef} resetKey={resetKey} onMove={markMoved}>
          <Drop className="relative h-full" rotate={0.5} delay={0.25}>
            <figure className="sb-polaroid mx-auto max-w-md lg:max-w-none">
              <span className="sb-tape sb-tape-left" />
              <div className="sb-photo sb-photo-ui aspect-[16/10]" role="img" aria-label="Wireframe sketch of a web interface">
                <span className="wf-bar" />
                <span className="wf-hero" />
                <span className="wf-row"><i /><i /><i /></span>
                <span className="wf-line" />
                <span className="wf-line short" />
              </div>
              <figcaption className="sb-hand">wireframe v3</figcaption>
            </figure>
          </Drop>
        </DraggableCard> */}



      </div>
    </section>
  );
}