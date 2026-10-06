import { useEffect, useState } from 'react';

type Direction = 'down' | 'up' | 'left' | 'right';

interface PlayerProps {
    position: { x: number; y: number };
    direction?: Direction;
    isMoving?: boolean;
}

export function Player({
    position,
    direction = 'down',
    isMoving = false,
}: PlayerProps) {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        if (!isMoving) return;

        const interval = window.setInterval(() => {
            setFrameIndex((previousFrame) => (previousFrame + 1) % 4);
        }, 120);

        return () => window.clearInterval(interval);
    }, [isMoving]);

    const sprite = isMoving
        ? `/assets/player/walk_${direction}_${frameIndex}.png`
        : `/assets/player/idle_${direction}.png`;

    return (
        <div
            className="pointer-events-none absolute z-20 transition-all duration-75 ease-linear motion-reduce:transition-none"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img
                src={sprite}
                alt=""
                aria-hidden="true"
                className="w-12 object-contain"
                style={{ imageRendering: 'pixelated' }}
            />
        </div>
    );
}
