export default interface Player {
    address: string;
    wins: number;
    losses: number;
    draws: number;
    duelCount: number;
    wizardCount: number;
    windMoveSet: number[];
    fireMoveSet: number[];
    waterMoveSet: number[];
    basicMoveSet: number[];
}
