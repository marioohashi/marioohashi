import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/Navbar';

export function PortfolioLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col">
            {import.meta.env.DEV && <Navbar />}

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}