type Direction = 'up' | 'down' | 'left' | 'right';

type TouchControlsProps = {
    onMove: (direction: Direction) => void;
};

const directions: { direction: Direction; label: string; icon: string }[] = [
    { direction: 'up', label: 'Mover para cima', icon: '↑' },
    { direction: 'left', label: 'Mover para a esquerda', icon: '←' },
    { direction: 'down', label: 'Mover para baixo', icon: '↓' },
    { direction: 'right', label: 'Mover para a direita', icon: '→' },
];

export function TouchControls({ onMove }: TouchControlsProps) {
    return (
        <div
            className="absolute bottom-4 right-4 z-30 grid grid-cols-3 gap-1.5 md:hidden"
            role="group"
            aria-label="Controles direcionais"
        >
            <span aria-hidden="true" />
            <DirectionButton {...directions[0]} onMove={onMove} />
            <span aria-hidden="true" />
            <DirectionButton {...directions[1]} onMove={onMove} />
            <DirectionButton {...directions[2]} onMove={onMove} />
            <DirectionButton {...directions[3]} onMove={onMove} />
        </div>
    );
}

function DirectionButton({
    direction,
    label,
    icon,
    onMove,
}: (typeof directions)[number] & TouchControlsProps) {
    return (
        <button
            type="button"
            onClick={() => onMove(direction)}
            aria-label={label}
            className="h-12 w-12 rounded-lg border border-slate-500 bg-slate-900/95 text-xl text-white shadow-lg focus-visible:outline-4 focus-visible:outline-sky-300"
        >
            {icon}
        </button>
    );
}
