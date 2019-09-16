export interface Stats {
    topWins: number;
    topLosses: number;
    topDraws: number;
    topPower: number;
    placementWins: number;
    placementLosses: number;
    placementDraws: number;
    placementPower: number;
    placementPercentageWins: number;
    placementPercentageLosses: number;
    placementPercentageDraws: number;
    placementPercentagePower: number;
    totalWizards: number;
    totalPlayers: number;
    readableDates: string[];
    powerPerDay: number[];
}
