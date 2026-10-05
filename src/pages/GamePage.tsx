import { useNavigate, Link } from 'react-router';
import { GameContainer } from '../features/game/GameContainer';

export function GamePage() {
    const navigate = useNavigate();

    return (
        <main className="w-screen h-screen overflow-hidden bg-[#0F172A] text-white relative font-mono">

            {/* HUD / Navbar Flutuante do Jogo */}
            <header className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
                {/* Botão de voltar ao Menu Principal */}
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto px-3.5 py-1.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-sky-400 hover:bg-slate-800 hover:text-white shadow-lg backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                    &larr; Menu
                </button>

                {/* Atalho direto para o Portfólio Tradicional */}
                <Link
                    to="/portfolio"
                    className="pointer-events-auto px-3.5 py-1.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-emerald-400 hover:bg-slate-800 hover:text-white shadow-lg backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                    📄 Skip to Portfolio &rarr;
                </Link>
            </header>

            <GameContainer />
        </main>
    );
}