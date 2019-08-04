export default interface Duel {
    duelId: number;
    wiz1Id: number;
    wiz2Id: number;
    startBlock: number;
    endBlock: number;
    isAscensionBattle: boolean;
    moveSet1: number[];
    moveSet2: number[];
    power1: string;
    power2: string;
    timedOut: boolean;
}
