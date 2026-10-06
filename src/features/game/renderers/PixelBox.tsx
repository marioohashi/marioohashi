type PixelBoxProps = {
    position: [number, number];
    label: string;
    icon?: string;
    description: string;
    isNearby: boolean;
    onClick: () => void;
};

export function PixelBox({
    position,
    label,
    icon,
    description,
    isNearby,
    onClick,
}: PixelBoxProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`${label}. ${description}`}
            aria-current={isNearby ? 'location' : undefined}
            className={`absolute z-30 flex h-15 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md border-2 border-amber-400 bg-slate-900 px-1 font-mono text-amber-200 shadow-[4px_4px_0px_0px_#f59e0b] transition-transform hover:scale-105 focus-visible:z-40 focus-visible:outline-4 focus-visible:outline-sky-300 motion-reduce:transition-none motion-reduce:hover:scale-100 md:h-21.25 md:w-27.5 ${isNearby ? 'scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] motion-reduce:scale-100' : ''}`}
            style={{
                left: `${position[0]}%`,
                top: `${position[1]}%`,
            }}
        >
            {icon && <span className="mb-1 text-xl" aria-hidden="true">{icon}</span>}
            <span className="px-1 text-center text-[9px] font-bold uppercase tracking-wider">{label}</span>
            {isNearby && <span className="sr-only">Personagem próximo</span>}
        </button>
    );
}
