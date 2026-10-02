export interface Position {
    x: number;
    y: number;
}

export interface GameEntity {
    position: Position;
    size?: [number, number];
    label?: string;
    icon?: string;
    renderer: any;
    onClick?: () => void;
}

export interface LocationData {
    id: string;
    name: string;
    description: string;
    x: number;
    y: number;
    icon: string;
    category: string;
}