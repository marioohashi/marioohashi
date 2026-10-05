import { useState, useEffect, useRef } from 'react';
import { PixelBox } from './renderers/PixelBox';
import { Player } from './renderers/Player';
import { PixelatedImage } from './utils/pixelatedImage';
import { GAME_LOCATIONS } from './data/locations';
import type { LocationData } from './types/game';
import { useNavigate, Link } from 'react-router';

export function GameContainer() {
    const navigate = useNavigate();
    const [activeLocation, setActiveLocation] = useState<LocationData | null>(null);
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    const [nearbyLocation, setNearbyLocation] = useState<LocationData | null>(null);

    // Guarda o destino atual para onde o player está caminhando automaticamente
    const targetPositionRef = useRef<{ x: number; y: number } | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const isMobile = window.innerWidth < 768;

    // Movimento manual via teclado (interrompe o caminhar automático se o usuário mexer)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Se o usuário apertar o teclado, cancela o movimento automático em direção a um ícone
            targetPositionRef.current = null;

            const speed = 4;
            setPlayerPosition((prev) => {
                let newX = prev.x;
                let newY = prev.y;

                if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                    newY = Math.max(5, prev.y - speed);
                }
                if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                    newY = Math.min(85, prev.y + speed);
                }
                if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                    newX = Math.max(5, prev.x - speed);
                }
                if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                    newX = Math.min(90, prev.x + speed);
                }

                return { x: newX, y: newY };
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Loop de animação para mover o player gradualmente até o destino clicado
    useEffect(() => {
        const step = () => {
            if (targetPositionRef.current) {
                setPlayerPosition((prev) => {
                    const target = targetPositionRef.current;
                    if (!target) return prev;

                    const dx = target.x - prev.x;
                    const dy = target.y - prev.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Velocidade da caminhada automática
                    const stepSpeed = 0.8;

                    // Se já estiver muito perto do destino, encerra o movimento automático e abre a localidade
                    if (distance < stepSpeed) {
                        targetPositionRef.current = null;
                        return { x: target.x, y: target.y };
                    }

                    // Move um passinho na direção do alvo
                    const vx = (dx / distance) * stepSpeed;
                    const vy = (dy / distance) * stepSpeed;

                    return { x: prev.x + vx, y: prev.y + vy };
                });
            }
            animationFrameRef.current = requestAnimationFrame(step);
        };

        animationFrameRef.current = requestAnimationFrame(step);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Verifica a proximidade do player com as localizações
    useEffect(() => {
        let found: LocationData | null = null;

        for (const loc of GAME_LOCATIONS) {
            const distance = Math.sqrt(
                Math.pow(playerPosition.x - loc.x, 2) + Math.pow(playerPosition.y - loc.y, 2)
            );

            if (distance < 6) {
                found = loc;
                break;
            }
        }

        setNearbyLocation(found);
    }, [playerPosition]);

    // Ao clicar na casinha, define o destino para o player caminhar até lá
    const handleLocationClick = (loc: LocationData) => {
        // Faz o player caminhar até pertinho da casinha (ex: levemente acima ou em cima das coordenadas)
        targetPositionRef.current = { x: loc.x, y: loc.y };

        // Opcional: já deixa o modal pré-selecionado ou abre ao chegar
        setActiveLocation(loc);
        if (loc.category === 'projects') {
            // Se quiser navegar direto ou só quando chegar, pode ajustar aqui
            // Por enquanto, ele caminha até lá. Se quiser navegar direto ao chegar, podemos tratar no useEffect de proximidade.
        }
    };

    const touchStart = useRef({ x: 0, y: 0 });
 
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };
 
    const handleTouchMove = (e: React.TouchEvent) => {
        const dx = e.touches[0].clientX - touchStart.current.x;
        const dy = e.touches[0].clientY - touchStart.current.y;
 
        const speed = 2;
 
        setPlayerPosition((prev) => ({
            x: Math.max(5, Math.min(90, prev.x + dx * 0.02 * speed)),
            y: Math.max(5, Math.min(85, prev.y + dy * 0.02 * speed))
        }));
 
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleMapTap = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();
 
        const x =
            ((e.clientX - rect.left) / rect.width) * 100;
 
        const y =
            ((e.clientY - rect.top) / rect.height) * 100;
 
        targetPositionRef.current = { x, y };
    };

    return (
        <main className="w-screen h-screen overflow-hidden bg-slate-950 relative font-mono select-none focus:outline-none" tabIndex={0}>

            {/* HUD Superior */}
            <header className="absolute top-2 left-2 right-2 z-30 flex flex-col sm:flex-row gap-2 sm:justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto px-3.5 py-1.5 bg-slate-900 border-2 border-slate-700 rounded-lg text-xs text-sky-400 hover:bg-slate-800 shadow-[3px_3px_0px_0px_#0284c7] transition-all cursor-pointer"
                >
                    &larr; Menu
                </button>
                <Link
                    to="/portfolio"
                    className="pointer-events-auto px-3.5 py-1.5 bg-slate-900 border-2 border-emerald-600 rounded-lg text-xs text-emerald-400 hover:bg-slate-800 shadow-[3px_3px_0px_0px_#059669] transition-all cursor-pointer"
                >
                    📄 Skip to Portfolio &rarr;
                </Link>
            </header>

            {/* Caixa de Diálogo */}
            {(activeLocation || nearbyLocation) && (
                <div className="absolute bottom-24 md:bottom-16 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl bg-slate-900 border-2 border-amber-400 p-4 rounded-xl shadow-[6px_6px_0px_0px_#f59e0b] text-amber-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                        <span className="font-bold text-sm flex items-center gap-2">
                            <span>{(activeLocation || nearbyLocation)?.icon}</span> {(activeLocation || nearbyLocation)?.name}
                        </span>
                        <button
                            onClick={() => {
                                setActiveLocation(null);
                                if (nearbyLocation?.category === 'projects') {
                                    navigate('/portfolio');
                                }
                            }}
                            className="text-xs text-slate-400 hover:text-white px-2 py-0.5 border border-slate-700 rounded cursor-pointer"
                        >
                            [Acessar / Fechar]
                        </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        {(activeLocation || nearbyLocation)?.description}
                    </p>
                    <span className="text-[10px] text-emerald-400 mt-1">
                        ✨ Clique em "[Acessar / Fechar]" ou aperte as teclas para continuar explorando.
                    </span>
                </div>
            )}

            {/* Dica de comando */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-slate-900/90 border border-slate-700 rounded-lg text-[10px] text-slate-400 pointer-events-none shadow-md">
                Clique em uma localização para o personagem caminhar até lá, ou use <span className="text-amber-400 font-bold">WASD</span>
            </div>

            {/* Cenário e Elementos */}
            <div className="absolute inset-0" onClick={handleMapTap}>
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <PixelatedImage
                        src="/assets/background.png"
                        alt="Background Overworld"
                        pixelSize={4}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 z-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                <Player position={playerPosition} />

                {GAME_LOCATIONS.map((loc, index) => {
                    const isNearby = nearbyLocation?.id === loc.id;

                    return (
                        <div
                            key={loc.id || index}
                            className={`absolute z-30 pointer-events-auto cursor-pointer transition-transform duration-200 ${isNearby ? 'scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]' : ''
                                }`}
                            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        >
                            <PixelBox
                                position={[0, 0]}
                                size={isMobile ? [80, 60] : [110, 85]}
                                label={loc.name}
                                icon={loc.icon}
                                onClick={() => handleLocationClick(loc)}
                            />
                            Show more lines
                        </div>
                    );
                })}
            </div>

            <div
                className="absolute inset-0"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >

            </div>
        </main>
    );
}