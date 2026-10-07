import type { LocationData } from '../types/game';

type LocationCardProps = {
    location: LocationData;
    onClose: () => void;
    onNavigate: () => void;
    onContinue: () => void;
};

export function LocationCard({
    location,
    onClose,
    onNavigate,
    onContinue,
}: LocationCardProps) {
    return (
        <section
            className="absolute bottom-24 left-1/2 z-40 w-[min(94vw,34rem)] -translate-x-1/2 rounded-xl border-2 border-amber-400 bg-slate-900 p-4 text-amber-100 shadow-[6px_6px_0px_0px_#f59e0b] sm:bottom-16"
            aria-labelledby="location-title"
            aria-live="polite"
        >
            <div className="flex items-start justify-between gap-3 border-b border-slate-700 pb-2">
                <h2 id="location-title" className="flex items-center gap-2 text-sm font-bold">
                    <span aria-hidden="true">{location.icon}</span>
                    {location.name}
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-sky-300"
                    aria-label={`Fechar ${location.name}`}
                >
                    Fechar
                </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-200">
                {location.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={onNavigate}
                    className="rounded-lg border border-emerald-500 bg-emerald-950 px-3 py-2 text-xs font-bold text-emerald-200 hover:bg-emerald-900 focus-visible:outline-4 focus-visible:outline-emerald-300"
                >
                    {location.action} <span aria-hidden="true">→</span>
                </button>
                <button
                    type="button"
                    onClick={onContinue}
                    className="rounded-lg border border-slate-600 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 focus-visible:outline-4 focus-visible:outline-sky-300"
                >
                    Continuar explorando
                </button>
            </div>
        </section>
    );
}
