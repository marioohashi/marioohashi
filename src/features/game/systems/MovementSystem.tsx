import type { Position } from '../types/game';

export const MovementSystem = (entities: any, { input }: { input: any }) => {
    const { payload } = input.find((x: any) => x.name === 'keydown') || {};
    const player = entities.player;

    if (player && payload) {
        const speed = 4;
        const currentPos: Position = player.position;

        if (payload.key === 'ArrowUp' || payload.key === 'w') {
            currentPos.y = Math.max(5, currentPos.y - speed);
        }
        if (payload.key === 'ArrowDown' || payload.key === 's') {
            currentPos.y = Math.min(85, currentPos.y + speed);
        }
        if (payload.key === 'ArrowLeft' || payload.key === 'a') {
            currentPos.x = Math.max(5, currentPos.x - speed);
        }
        if (payload.key === 'ArrowRight' || payload.key === 'd') {
            currentPos.x = Math.min(90, currentPos.x + speed);
        }
    }

    return entities;
};