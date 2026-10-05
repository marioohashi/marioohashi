import { Player } from '../renderers/Player';

export const createPlayerEntity = (initialPosition = { x: 50, y: 50 }) => ({
    position: initialPosition,
    renderer: Player,
});