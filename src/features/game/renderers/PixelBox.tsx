export function PixelBox({ position, size, label, icon, onClick }: {
    position: [number, number],
    size: [number, number],
    label: string,
    icon?: string,
    onClick?: () => void
}) {
    return (
        <div
            onClick={onClick}
            className="absolute flex flex-col items-center justify-center bg-slate-900 border-2 border-amber-400 text-amber-200 font-mono shadow-[4px_4px_0px_0px_#f59e0b] select-none cursor-pointer hover:bg-slate-800 hover:scale-105 transition-all"
            style={{
                left: `${position[0]}px`,
                top: `${position[1]}px`,
                width: `${size[0]}px`,
                height: `${size[1]}px`,
            }}
        >
            {icon && <span className="text-xl mb-1">{icon}</span>}
            <span className="text-[9px] uppercase font-bold tracking-wider text-center px-1">{label}</span>
        </div>
    );
}