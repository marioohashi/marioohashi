import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { GAME_LOCATIONS } from './data/locations';
import { LocationCard } from './components/LocationCard';
import { TouchControls } from './components/TouchControls';
import { PixelBox } from './renderers/PixelBox';
import { Player } from './renderers/Player';
import { PixelatedImage } from './utils/pixelatedImage';
import type { LocationData, Position } from './types/game';

const INITIAL_POSITION: Position = { x: 50, y: 50 };
const PROXIMITY_RADIUS = 8;
const MAP_BOUNDS = { minX: 5, maxX: 95, minY: 10, maxY: 88 };
const KEY_DIRECTIONS: Record<string, 'up' | 'down' | 'left' | 'right'> = {
    ArrowUp: 'up',
    w: 'up',
    W: 'up',
    ArrowDown: 'down',
    s: 'down',
    S: 'down',
    ArrowLeft: 'left',
    a: 'left',
    A: 'left',
    ArrowRight: 'right',
    d: 'right',
    D: 'right',
};

function findNearbyLocation(position: Position): LocationData | null {
    let closest: LocationData | null = null;
    let closestDistance = PROXIMITY_RADIUS;

    for (const location of GAME_LOCATIONS) {
        const distance = Math.hypot(position.x - location.x, position.y - location.y);
        if (distance < closestDistance) {
            closest = location;
            closestDistance = distance;
        }
    }

    return closest;
}

export function GameContainer() {
    const navigate = useNavigate();
    const [playerPosition, setPlayerPosition] = useState(INITIAL_POSITION);
    const [nearbyLocation, setNearbyLocation] = useState<LocationData | null>(null);
    const [activeLocation, setActiveLocation] = useState<LocationData | null>(null);
    const [direction, setDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [isMoving, setIsMoving] = useState(false);
    const [movementAnnouncement, setMovementAnnouncement] = useState(
        'Use the arrow keys or WASD to move. You can also select any location on the map.',
    );
    const playerPositionRef = useRef(INITIAL_POSITION);
    const lastNearbyIdRef = useRef<string | null>(null);
    const targetPositionRef = useRef<Position | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number | null>(null);
    const movementTimeoutRef = useRef<number | null>(null);

    const updatePosition = useCallback((position: Position) => {
        playerPositionRef.current = position;
        setPlayerPosition(position);

        const nextNearby = findNearbyLocation(position);
        setNearbyLocation(nextNearby);

        if (nextNearby?.id !== lastNearbyIdRef.current) {
            lastNearbyIdRef.current = nextNearby?.id ?? null;
            setActiveLocation(nextNearby);
            if (nextNearby) {
                setMovementAnnouncement(`Você chegou a ${nextNearby.name}.`);
            }
        }
    }, []);

    const stopWalking = useCallback(() => {
        targetPositionRef.current = null;
        lastFrameTimeRef.current = null;
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    const walkTo = useCallback((destination: Position) => {
        stopWalking();
        const target = {
            x: Math.max(MAP_BOUNDS.minX, Math.min(MAP_BOUNDS.maxX, destination.x)),
            y: Math.max(MAP_BOUNDS.minY, Math.min(MAP_BOUNDS.maxY, destination.y)),
        };
        targetPositionRef.current = target;
        const destinationLocation = findNearbyLocation(target);
        setActiveLocation(null);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            updatePosition(target);
            stopWalking();
            setIsMoving(false);
            return;
        }
        setMovementAnnouncement('Walking to the selected destination.');

        const step = (time: number) => {
            const target = targetPositionRef.current;
            if (!target) return;

            const previousTime = lastFrameTimeRef.current ?? time;
            const elapsed = Math.min(time - previousTime, 32);
            lastFrameTimeRef.current = time;

            const current = playerPositionRef.current;
            const dx = target.x - current.x;
            const dy = target.y - current.y;
            const distance = Math.hypot(dx, dy);
            const stepDistance = 0.045 * elapsed;

            if (distance <= stepDistance || distance === 0) {
                updatePosition(target);
                stopWalking();
                setIsMoving(false);
                return;
            }

            setDirection(Math.abs(dx) > Math.abs(dy)
                ? (dx > 0 ? 'right' : 'left')
                : (dy > 0 ? 'down' : 'up'));
            setIsMoving(true);
            const nextPosition = {
                x: current.x + (dx / distance) * stepDistance,
                y: current.y + (dy / distance) * stepDistance,
            };
            updatePosition(nextPosition);
            if (destinationLocation && findNearbyLocation(nextPosition)?.id === destinationLocation.id) {
                stopWalking();
                setIsMoving(false);
                return;
            }
            animationFrameRef.current = requestAnimationFrame(step);
        };

        animationFrameRef.current = requestAnimationFrame(step);
    }, [stopWalking, updatePosition]);

    useEffect(() => () => {
        stopWalking();
        if (movementTimeoutRef.current !== null) {
            window.clearTimeout(movementTimeoutRef.current);
        }
    }, [stopWalking]);

    const moveBy = (nextDirection: 'up' | 'down' | 'left' | 'right') => {
        stopWalking();
        setDirection(nextDirection);
        setIsMoving(true);
        if (movementTimeoutRef.current !== null) {
            window.clearTimeout(movementTimeoutRef.current);
        }
        movementTimeoutRef.current = window.setTimeout(() => setIsMoving(false), 180);

        const current = playerPositionRef.current;
        const nextPosition = {
            x: current.x + (nextDirection === 'left' ? -4 : nextDirection === 'right' ? 4 : 0),
            y: current.y + (nextDirection === 'up' ? -4 : nextDirection === 'down' ? 4 : 0),
        };
        updatePosition({
            x: Math.max(MAP_BOUNDS.minX, Math.min(MAP_BOUNDS.maxX, nextPosition.x)),
            y: Math.max(MAP_BOUNDS.minY, Math.min(MAP_BOUNDS.maxY, nextPosition.y)),
        });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Escape') {
            stopWalking();
            setIsMoving(false);
            setActiveLocation(null);
            setMovementAnnouncement('Movimento interrompido. Continue explorando quando quiser.');
            return;
        }

        const nextDirection = KEY_DIRECTIONS[event.key];
        if (!nextDirection) return;
        event.preventDefault();
        moveBy(nextDirection);
    };

    const handleMapClick = (event: MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest('button')) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        walkTo({
            x: ((event.clientX - bounds.left) / bounds.width) * 100,
            y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
    };

    const handleLocationSelect = (location: LocationData) => {
        walkTo({ x: location.x, y: location.y });
    };

    const handleLocationAction = (location: LocationData) => {
        navigate(location.destination);
        const sectionId = new URL(location.destination, window.location.origin).hash.slice(1);
        if (sectionId) {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    document.getElementById(sectionId)?.scrollIntoView({
                        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                            ? 'auto'
                            : 'smooth',
                    });
                });
            });
        }
    };

    return (
        <main className="relative h-full min-h-svh w-full overflow-hidden bg-slate-950 font-mono text-white">
            <header className="absolute left-2 right-2 top-2 z-40 flex items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="rounded-lg border-2 border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-sky-300 shadow-[3px_3px_0px_0px_#0284c7] transition-colors hover:bg-slate-800 focus-visible:outline-4 focus-visible:outline-sky-300"
                >
                    <span aria-hidden="true">← </span>Menu principal
                </button>
                <Link
                    to="/portfolio"
                    className="rounded-lg border-2 border-emerald-700 bg-slate-900 px-3.5 py-2 text-xs text-emerald-300 shadow-[3px_3px_0px_0px_#059669] transition-colors hover:bg-slate-800 focus-visible:outline-4 focus-visible:outline-emerald-300"
                >
                    Ver portfólio <span aria-hidden="true">→</span>
                </Link>
            </header>

            <section
                className="absolute inset-0 focus:outline-none focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-sky-300"
                aria-label="Mapa interativo"
                aria-describedby="game-instructions"
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                <p id="game-instructions" className="sr-only">
                    Interactive map. Use the arrow keys or WASD to move around. Press Escape to stop or close the current location.
                    You can also use the location buttons, click on the map, or use the directional controls.
                </p>
                <div
                    className="absolute inset-0"
                    onClick={handleMapClick}
                    role="presentation"
                >
                    <PixelatedImage
                        src="/assets/background.png"
                        alt=""
                        pixelSize={4}
                        className="pointer-events-none h-full w-full object-cover opacity-30"
                    />
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[24px_24px] opacity-40" />

                    {GAME_LOCATIONS.map((location) => (
                        <PixelBox
                            key={location.id}
                            position={[location.x, location.y]}
                            label={location.name}
                            description={location.description}
                            icon={location.icon}
                            isNearby={nearbyLocation?.id === location.id}
                            onClick={() => handleLocationSelect(location)}
                        />
                    ))}
                    <Player
                        position={playerPosition}
                        direction={direction}
                        isMoving={isMoving}
                    />
                </div>
            </section>

            <div className="pointer-events-none absolute left-1/2 top-18 z-20 -translate-x-1/2 rounded-xl border border-slate-600 bg-slate-950/85 px-3 py-2 text-center text-xs text-slate-200 shadow-lg backdrop-blur-sm sm:top-20">
                <p className="font-bold text-amber-300">OHASHI&apos;S JOURNEY</p>
                <p className="mt-1 text-[10px] text-slate-300">Explore the 5 locations on the map.</p>
            </div>

            <p
                className="sr-only"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                {movementAnnouncement}
            </p>

            {activeLocation && (
                <LocationCard
                    location={activeLocation}
                    onClose={() => setActiveLocation(null)}
                    onNavigate={() => handleLocationAction(activeLocation)}
                    onContinue={() => {
                        setActiveLocation(null);
                        setMovementAnnouncement('Local fechado. Continue explorando o mapa.');
                    }}
                />
            )}

            <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-950/90 px-4 py-2 text-center text-xs text-slate-300 shadow-md md:block">
                Arrow keys / WASD to move · Click on the map or a location to walk · Esc to stop
            </p>

            <TouchControls onMove={moveBy} />
        </main>
    );
}
