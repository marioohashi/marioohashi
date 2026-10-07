import type { ComponentType } from 'react';

export interface Position {
    x: number;
    y: number;
}

export interface GameEntityRendererProps {
    position: Position;
    direction?: 'down' | 'up' | 'left' | 'right';
    isMoving?: boolean;
}

export interface GameEntity {
    position: Position;
    size?: [number, number];
    label?: string;
    icon?: string;
    renderer: ComponentType<GameEntityRendererProps>;
    onClick?: () => void;
}

export interface LocationData {
    id: string;
    name: string;
    description: string;
    x: number;
    y: number;
    icon: string;
    category: 'start' | 'experience' | 'projects' | 'skills' | 'tavern';
    destination: string;
    action: string;
}