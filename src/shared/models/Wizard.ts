export interface Wizard {
    id: number;
    owner: string;
    affinity: number;
    power: string;
    wins: number;
    losses: number;
    draws: number;
    duelCount: number;
    commonMoveSet: number[];
    commonMove: number;
}
