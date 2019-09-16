export default interface Player {
    address: string;
    wins: number;
    losses: number;
    draws: number;
    duelCount: number;
    wizardCount: number;
    wizardPowerSum: number;
    windMoves: number[];
    fireMoves: number[];
    waterMoves: number[];
    basicMoves: number[];
    windMoveProbabilities: number[];
    fireMoveProbabilities: number[];
    waterMoveProbabilities: number[];
    basicMoveProbabilities: number[];
}
