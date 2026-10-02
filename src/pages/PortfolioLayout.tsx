import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/Navbar';

export function PortfolioLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col">
            {/* Barra de navegação hierárquica fixa no topo */}
            <Navbar />

            {/* O conteúdo das páginas (Home, About, GuessWord) é renderizado aqui */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}