import { useState, useEffect } from 'react';

interface PlayerProps {
    position: { x: number; y: number };
}

export function Player({ position }: PlayerProps) {
    const [direction, setDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [isMoving, setIsMoving] = useState(false);
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        let movingTimeout: NodeJS.Timeout;

        const handleKeyDown = (e: KeyboardEvent) => {
            setIsMoving(true);

            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                setDirection('up');
            } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                setDirection('down');
            } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                setDirection('left');
            } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                setDirection('right');
            }

            clearTimeout(movingTimeout);
            movingTimeout = setTimeout(() => setIsMoving(false), 150);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(movingTimeout);
        };
    }, []);

    useEffect(() => {
        if (!isMoving) {
            setFrameIndex(0); // Volta pro frame parado
            return;
        }

        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % 3);
        }, 120);

        return () => clearInterval(interval);
    }, [isMoving]);

    const getPlayerSprite = () => {
        if (isMoving) {
            return `/assets/player/walk_${direction}_${frameIndex}.png`;
        }
        return `/assets/player/idle_${direction}.png`;
    };

    return (
        <div
            className="absolute z-20 transition-all duration-75 ease-linear pointer-events-none"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <img
                src={getPlayerSprite()}
                alt="Player Sprite"
                className="w-12 object-contain"
                style={{ imageRendering: 'pixelated' }}
            />
        </div>
    );
}