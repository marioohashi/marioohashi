import { useNavigate } from 'react-router';

export function TitleScreen() {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 text-white font-mono select-none">
            <div className="text-center max-w-xl space-y-6">
                <div className="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs rounded-full mb-2">
                    Interactive Portfolio Edition
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#FFD700] tracking-wider drop-shadow-lg">
                    OHASHI'S JOURNEY
                </h1>
                <p className="text-sm md:text-base text-slate-400">
                    Full Stack Developer • Bridging Engineering & UI/UX
                </p>

                <div className="flex flex-col gap-4 mt-8 max-w-xs mx-auto">
                    <button
                        onClick={() => navigate('/game')}
                        className="py-3 px-6 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer text-sm tracking-wider"
                    >
                        ▶ START GAME (OVERWORLD)
                    </button>
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="py-3 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold rounded-lg transition-all cursor-pointer text-sm tracking-wider"
                    >
                        📄 PORTFOLIO VIEW (CREDITS)
                    </button>
                </div>
            </div>
            <div className="absolute bottom-6 text-xs text-slate-500">
                Mario Ohashi da Trindade • Curitiba, PR • 2026
            </div>
        </div>
    );
}