import type { Position } from '../types/game';

interface KeyboardInput {
    name: string;
    payload?: { key: string };
}

export const MovementSystem = (
    entities: Record<string, { position: Position }>,
    { input }: { input: KeyboardInput[] },
) => {
    const payload = input.find((event) => event.name === 'keydown')?.payload;
    const player = entities.player;
    const key = payload?.key.toLowerCase();

    if (player && key) {
        const speed = 4;
        const currentPos: Position = player.position;

        if (key === 'arrowup' || key === 'w') {
            currentPos.y = Math.max(5, currentPos.y - speed);
        }
        if (key === 'arrowdown' || key === 's') {
            currentPos.y = Math.min(85, currentPos.y + speed);
        }
        if (key === 'arrowleft' || key === 'a') {
            currentPos.x = Math.max(5, currentPos.x - speed);
        }
        if (key === 'arrowright' || key === 'd') {
            currentPos.x = Math.min(90, currentPos.x + speed);
        }
    }

    return entities;
};