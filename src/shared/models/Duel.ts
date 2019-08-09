export default interface Duel {
    duelId: number;
    wiz1Id: number;
    wiz2Id: number;
    wiz1PowerChange: number;
    wiz2PowerChange: number;
    wiz1Win: boolean;
    startBlock: number;
    endBlock: number;
    isAscensionBattle: boolean;
    moveSet1: number[];
    moveSet2: number[];
    power1: number;
    power2: number;
    timedOut: boolean;
}
