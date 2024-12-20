export type Coord = {
    x: number;
    y: number;
};

export function addCoords(coord1: Coord, coord2: Coord) {
    return { x: coord1.x + coord2.x, y: coord1.y + coord2.y };
}

export type Modes =
    | "ghost"
    | "available"
    | "found"
    | "finding"
    | "barrier"
    | "path";

export enum Trudge {
    ASPHALT,
    GRASS,
    MUD,
    WATER,
}

export function getTrudgeCost(trudge: Trudge) {
    const multiplier = 1;
    switch (trudge) {
        case Trudge.ASPHALT:
            return 1 * multiplier;
        case Trudge.GRASS:
            return 2 * multiplier;
        case Trudge.MUD:
            return 4 * multiplier;
        case Trudge.WATER:
            return 10 * multiplier;
        default:
            return 2;
    }
}

export type Block = {
    mode: Modes;
    role?: "start" | "end";
    trudge: Trudge;
    x: number;
    y: number;
};

export type Grid = Block[][];

export type SettingsType = {
    canPerformDiagonals: boolean;
    heuristicMultiplier: number; // direction
    normalizeDirection: boolean; // normalize heuristc value depending on the medium
    algoSpeed: number; // Speed of algorithm; higher is slower
    pathRevealSpeed: number; // The time it takes to show the path taken to get to the end
};
