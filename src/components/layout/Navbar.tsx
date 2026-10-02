import { Link, useLocation } from 'react-router';

export function Navbar() {
    const location = useLocation();

    const isHome = location.pathname === '/portfolio';
    const isAbout = location.pathname === '/portfolio/about';
    const isGuessWord = location.pathname === '/portfolio/guessword';

    return (
        <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 font-mono">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Hierarquia / Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Link to="/" className="hover:text-sky-400 transition-colors">
                        🏠 Menu
                    </Link>
                    <span>/</span>
                    <Link to="/portfolio" className="hover:text-sky-400 transition-colors">
                        Portfolio View
                    </Link>
                    {!isHome && (
                        <>
                            <span>/</span>
                            <span className="text-sky-400 capitalize">
                                {isAbout ? 'About' : isGuessWord ? 'Guess Word Game' : 'Page'}
                            </span>
                        </>
                    )}
                </div>

                {/* Links de navegação interna do portfólio */}
                <nav className="flex items-center gap-3 text-xs">
                    <Link
                        to="/portfolio"
                        className={`px-3 py-1.5 rounded-lg border transition-all ${isHome
                            ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/portfolio/about"
                        className={`px-3 py-1.5 rounded-lg border transition-all ${isAbout
                            ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                    >
                        About Me
                    </Link>
                    <Link
                        to="/game"
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all ml-2"
                    >
                        ⚡ Switch to Game
                    </Link>
                </nav>
            </div>
        </header>
    );
}