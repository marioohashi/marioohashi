import { GameEngine } from 'react-game-engine';
import { MovementSystem } from './systems/MovementSystem';
import { PixelBox } from './renderers/PixelBox';
import { useNavigate, Link } from 'react-router';

export function GameContainer() {
    const navigate = useNavigate();

    return (
        <main className="w-screen h-screen overflow-hidden bg-slate-950 relative font-mono select-none">

            {/* HUD Superior / Navbar do Jogo */}
            <header className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
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

            {/* Dica de comando na tela */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-[10px] text-slate-400 pointer-events-none shadow-md">
                Use <span className="text-amber-400 font-bold">WASD</span> ou <span className="text-amber-400 font-bold">Setas do Teclado</span> para andar • Clique nas construções para interagir
            </div>

            {/* O Motor do Jogo */}
            <GameEngine
                systems={[MovementSystem]}
                entities={{
                    player: {
                        position: { x: 100, y: 300 },
                        renderer: <div className="absolute w-8 h-8 bg-sky-500 border-2 border-white shadow-[2px_2px_0px_0px_black] flex items-center justify-center text-xs animate-bounce">🧙‍♂️</div>
                    },
                    nodeProjects: {
                        position: [300, 200],
                        size: [110, 80],
                        label: "Projects",
                        icon: "💼",
                        renderer: PixelBox,
                        onClick: () => navigate('/portfolio')
                    },
                    nodeAbout: {
                        position: [550, 200],
                        size: [110, 80],
                        label: "About Me",
                        icon: "📜",
                        renderer: PixelBox,
                        onClick: () => navigate('/portfolio/about')
                    },
                    nodeGame: {
                        position: [425, 400],
                        size: [110, 80],
                        label: "Guess Word",
                        icon: "🎮",
                        renderer: PixelBox,
                        onClick: () => navigate('/portfolio/guessword')
                    }
                }}
            >
                {/* Fundo em Grid Estilo 16-bits */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            </GameEngine>
        </main>
    );
}