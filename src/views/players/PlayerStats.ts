import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import WizardService from '@/services/wizard.service';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';
import Player from '@/shared/models/Player';
import Duel from '@/shared/models/Duel';
import PlayerImageComponent from '../../components/player/PlayerImage';
import SpellComponent from '../../components/spell/Spell';
import SmallWizardImageComponent from '../../components/small-wizard/SmallWizardImage';
import web3 from 'web3';
import OpenSeaService from '@/services/opensea.service';
import LeaderboardWizard from '@/shared/models/LeadeboardWizard';
import { OpenSeaAsset } from '@/shared/models/OpenseaAsset';
import PercentageLineComponent from '../shared/percentage-line/PercentageLine';
import AffinityComponent from '../../components/affinity/Affinity';
import LineChartComponent from '../shared/line-chart/LineChart';
import { Stats } from '@/shared/models/Stats';
import { DataCollection } from '@/shared/models/ChartDataCollection';

@Component({
    components: {
        PlayerImageComponent,
        SpellComponent,
        SmallWizardImageComponent,
        PercentageLineComponent,
        AffinityComponent,
        LineChartComponent,
    },
})
export default class PlayerStatsComponent extends Vue {
    public playerAddress: string;
    public service: WizardService;
    public wizards: Wizard[];
    public basicWizards: LeaderboardWizard[];
    public fireWizards: LeaderboardWizard[];
    public waterWizards: LeaderboardWizard[];
    public windWizards: LeaderboardWizard[];
    public duels: Duel[];
    public player: Player;
    public openSeaService: OpenSeaService;
    public openSeaAssets: OpenSeaAsset[];
    public stats: Stats;
    public loadingWizards: boolean;
    public loadingStats: boolean;
    public loadingPlayer: boolean;
    public datasetPower: DataCollection;
    public powerChartWidth: string;

    constructor() {
        super();

        this.playerAddress = web3.utils.toChecksumAddress(router.currentRoute.params.address);
        this.service = new WizardService();
        this.loadingPlayer = true;
        this.loadingStats = true;
        this.loadingWizards = true;
        // tslint:disable-next-line:max-line-length
        this.player = { address: '', wins: 0, losses: 0, draws: 0, duelCount: 0, wizardCount: 0, wizardPowerSum: 0, windMoves: [], waterMoves: [], basicMoves: [], fireMoves: [], windMoveProbabilities: [], waterMoveProbabilities: [], basicMoveProbabilities: [], fireMoveProbabilities: [] };
        this.stats = {} as Stats;
        this.wizards = [];
        this.basicWizards = [];
        this.fireWizards = [];
        this.waterWizards = [];
        this.windWizards = [];
        this.duels = [];
        this.openSeaAssets = [];

        this.openSeaService = new OpenSeaService();
        this.datasetPower = {} as DataCollection;
        this.powerChartWidth = '';

        // tslint:disable-next-line:max-line-length
        this.service.getPlayer(this.playerAddress).then((response: ApiResponse<Player>) => this.setPlayer(response.result));

        // tslint:disable-next-line:max-line-length
        this.service.getWizardsByOwner(this.playerAddress).then((response: ApiResponse<Wizard[]>) => this.setWizards(response.result));

        // tslint:disable-next-line:max-line-length
        this.service.getPlayerStats(this.playerAddress).then((response: ApiResponse<Stats>) => this.setStats(response.result));
    }

    public get playerBattles(): number {
        return Math.max(this.player.wins + this.player.draws + this.player.losses, 1);
    }

    public get showWaterBorderColor(): boolean {
        return this.basicWizards.length === 0;
    }

    public get showFireBorderColor(): boolean {
        return this.waterWizards.length === 0 && this.showWaterBorderColor;
    }

    public get showWindBorderColor(): boolean {
        return this.fireWizards.length === 0 && this.showFireBorderColor;
    }

    public setPlayer(player: Player) {
        this.player = player;
        this.loadingPlayer = false;
    }

    public setStats(stats: Stats) {
        this.stats = stats;
        this.loadingStats = false;    // tslint:disable-next-line:max-line-length

        this.datasetPower = {
            labels: this.stats.readableDates,
            // tslint:disable-next-line:max-line-length
            datasets: [{ data: this.stats.powerPerDay.map(n => this.getReadablePower(n)), label: 'Power', backgroundColor: 'green', fill: false, borderColor: 'green' }],
        };

    }

    public setWizards(wizards: Wizard[]) {
        this.wizards = wizards;
        this.basicWizards = [];
        this.fireWizards = [];
        this.waterWizards = [];
        this.windWizards = [];

        wizards.forEach((wizard: Wizard) => {
            const a = wizard.affinity;
            if (a === 1) {
                this.basicWizards.push({ wizard, forSale: false });
            } else if (a === 2) {
                this.fireWizards.push({ wizard, forSale: false });
            } else if (a === 3) {
                this.waterWizards.push({ wizard, forSale: false });
            } else if (a === 4) {
                this.windWizards.push({ wizard, forSale: false });
            }
        });
        this.loadingWizards = false;

        this.getAllOpenSeaAssets();
    }

    public getAllOpenSeaAssets() {
        this.openSeaAssets = [];
        const assetBatches: number[][] = [];
        const wizCount = this.wizards.length;
        for (let i = 0; i < wizCount; i += 200) {
            assetBatches.push(this.wizards.slice(i, i + 200).map((w: Wizard) => w.id));
        }
        assetBatches.forEach((assets: number[], index: number) => {
            // tslint:disable-next-line:max-line-length
            this.openSeaService.getWizards(assets, 200, index).then((response: ApiResponse<OpenSeaAsset[]>) => this.addOpenSeaAssets(response.result));
        });
    }

    public addOpenSeaAssets(assets: OpenSeaAsset[]) {
        assets.forEach((w: OpenSeaAsset) => {
            const basicAssetIndex = this.basicWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            const fireAssetIndex = this.fireWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            const waterAssetIndex = this.waterWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            const windAssetIndex = this.windWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            if (basicAssetIndex >= 0) {
                const wa = this.basicWizards[basicAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.basicWizards.splice(basicAssetIndex, 1, wa);
            } else if (fireAssetIndex >= 0) {
                const wa = this.fireWizards[fireAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.fireWizards.splice(fireAssetIndex, 1, wa);
            } else if (waterAssetIndex >= 0) {
                const wa = this.waterWizards[waterAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.waterWizards.splice(waterAssetIndex, 1, wa);
            } else if (windAssetIndex >= 0) {
                const wa = this.windWizards[windAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.windWizards.splice(windAssetIndex, 1, wa);
            }
        });
    }

    public get basicSpellProbabilities(): number[][][] {
        if (this.player.basicMoveProbabilities) {
            const calculatedMoves: number[][][] = [];
            for (let i = 0; i < 3; i++) {
                calculatedMoves[i] = [];
                for (let j = 0; j < 5; j++) {
                    calculatedMoves[i][j] = [];
                }
            }
            let index = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    // tslint:disable-next-line:max-line-length
                    calculatedMoves[i][j].push(this.player.basicMoves[index], this.player.basicMoveProbabilities[index]);
                    index++;
                }
            }
            return calculatedMoves;
        }
        return [];
    }

    public get waterSpellProbabilities(): number[][][] {
        if (this.player.waterMoveProbabilities) {
            const calculatedMoves: number[][][] = [];
            for (let i = 0; i < 3; i++) {
                calculatedMoves[i] = [];
                for (let j = 0; j < 5; j++) {
                    calculatedMoves[i][j] = [];
                }
            }
            let index = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    // tslint:disable-next-line:max-line-length
                    calculatedMoves[i][j].push(this.player.waterMoves[index], this.player.waterMoveProbabilities[index]);
                    index++;
                }
            }
            return calculatedMoves;
        }
        return [];
    }

    public get windSpellProbabilities(): number[][][] {
        if (this.player.windMoveProbabilities) {
            const calculatedMoves: number[][][] = [];
            for (let i = 0; i < 3; i++) {
                calculatedMoves[i] = [];
                for (let j = 0; j < 5; j++) {
                    calculatedMoves[i][j] = [];
                }
            }
            let index = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    // tslint:disable-next-line:max-line-length
                    calculatedMoves[i][j].push(this.player.windMoves[index], this.player.windMoveProbabilities[index]);
                    index++;
                }
            }
            return calculatedMoves;
        }
        return [];
    }

    public get fireSpellProbabilities(): number[][][] {
        if (this.player.fireMoveProbabilities) {
            const calculatedMoves: number[][][] = [];
            for (let i = 0; i < 3; i++) {
                calculatedMoves[i] = [];
                for (let j = 0; j < 5; j++) {
                    calculatedMoves[i][j] = [];
                }
            }
            let index = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    // tslint:disable-next-line:max-line-length
                    calculatedMoves[i][j].push(this.player.fireMoves[index], this.player.fireMoveProbabilities[index]);
                    index++;
                }
            }
            return calculatedMoves;
        }
        return [];
    }

    public getReadablePower(power: number): number {
        const power1 = power.toString().substring(0, power.toString().length - 12);
        return +power1;
    }
}
