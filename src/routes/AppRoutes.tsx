import { Routes, Route, Navigate } from 'react-router';
import { TitleScreen } from '../pages/TitleScreen';
import { GamePage } from '../pages/GamePage';
import { PortfolioLayout } from '../pages/PortfolioLayout';
import { Home } from '../pages/Home';
import GuessWord from '../features/guess-word/GuessWord';
import { About } from '../pages/About';
import { NotFound } from '../pages/NotFound';

export function AppRoutes() {
    return (
        <Routes>
            {/* Rota Raiz: O Menu Principal / Title Screen */}
            <Route path="/" element=
                {import.meta.env.DEV ? <TitleScreen /> : <Navigate to="/portfolio" replace />} />

            {/* Rota do Jogo Interativo (Overworld) */}
            <Route path="/game" element={<GamePage />} />

            {/* Rotas do Portfólio Tradicional (Agrupadas sob /portfolio) */}
            <Route path="/portfolio" element={<PortfolioLayout />}>
                <Route index element={<Home />} />
                <Route path="guessword" element={<GuessWord />} />
                <Route path="about" element={<About />} />
            </Route>

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}