import { Component, Vue, Watch } from 'vue-property-decorator';
import WizardImageComponent from '../../components/wizard/WizardImage';
import router from '@/router';
import { Wizard } from '@/shared/models/Wizard';
import WizardService from '@/services/wizard.service';
import ApiResponse from '@/shared/models/ApiResponse';
import AffinityComponent from '@/components/affinity/Affinity';
import SpellComponent from '@/components/spell/Spell';
import DuelComponent from '@/components/duel/Duel';
import Duel from '@/shared/models/Duel';
import OpenSeaService from '@/services/opensea.service';
import { OpenSeaAsset } from '@/shared/models/OpenseaAsset';
// @ts-ignore
import TrendChart from 'vue-trend-chart';
import LineChartComponent from '../shared/line-chart/LineChart';
import { DataCollection } from '@/shared/models/ChartDataCollection';
import PercentageLineComponent from '../shared/percentage-line/PercentageLine';
import { Stats } from '@/shared/models/Stats';

@Component({
    components: {
        WizardImageComponent,
        AffinityComponent,
        SpellComponent,
        DuelComponent,
        TrendChart,
        LineChartComponent,
        PercentageLineComponent,
    },
})
export default class WizardStatsComponent extends Vue {
    public wizardId: number;
    public wizard: Wizard;
    public wizardService: WizardService;
    public duels: Duel[];
    public loadingWizard: boolean;
    public openSeaAsset: OpenSeaAsset | null;
    public openSeaService: OpenSeaService;
    public loadingDuels: boolean;
    public loadingStats: boolean;
    public loadingAsset: boolean;
    public datasetWinDrawLosses: DataCollection;
    public datasetPower: DataCollection;
    public powerChartWidth: string;
    public stats: Stats;


    constructor() {
        super();

        this.wizardService = new WizardService();
        this.openSeaService = new OpenSeaService();
        this.loadingWizard = true;
        this.loadingDuels = true;
        this.loadingStats = true;
        this.loadingAsset = true;
        this.stats = {} as Stats;

        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        // tslint:disable-next-line:max-line-length
        this.wizard = { historicPower: [], historicDraw: [], historicLoss: [], historicWin: [], id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [], commonMoves: [], commonMovesProbabilities: [], wins: 0, losses: 0, draws: 0, duelCount: 0 };
        this.openSeaAsset = null;
        this.duels = [];

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardStats(this.wizardId).then((response: ApiResponse<Stats>) => this.setWizardStats(response.result));

        this.datasetWinDrawLosses = {} as DataCollection;
        this.datasetPower = {} as DataCollection;

        this.powerChartWidth = '';
    }

    @Watch('$route')
    public onRouteChange() {
        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        this.duels = [];
        this.loadingWizard = true;
        this.loadingDuels = true;
        this.loadingStats = true;
        this.loadingAsset = true;
        this.openSeaAsset = null;

        // tslint:disable-next-line:max-line-length
        this.wizard = { historicPower: [], historicDraw: [], historicLoss: [], historicWin: [], id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [], commonMoves: [], commonMovesProbabilities: [], wins: 0, losses: 0, draws: 0, duelCount: 0 };

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardStats(this.wizardId).then((response: ApiResponse<Stats>) => this.setWizardStats(response.result));
    }

    public setWizard(wizard: Wizard) {
        this.wizard = wizard;

        // tslint:disable-next-line:max-line-length
        this.wizardService.getDuels(this.wizardId).then((response: ApiResponse<Duel[]>) => this.setDuels(response.result));

        this.openSeaService.getWizard(this.wizardId).then((response: any) => this.setOpenSeaAsset(response.result));

        // tslint:disable-next-line:max-line-length
        this.datasetWinDrawLosses = {
            labels: [0].concat(this.wizard.historicWin).map((i, index) => 'Aug ' + index + 'th'),
            // tslint:disable-next-line:max-line-length
            datasets: [{ data: [0].concat(this.wizard.historicWin), label: 'Wins', backgroundColor: 'green', fill: false, borderColor: 'green' },
            // tslint:disable-next-line:max-line-length
            { data: [0].concat(this.wizard.historicLoss), label: 'Losses', backgroundColor: 'indianred', fill: false, borderColor: 'indianred' },
            // tslint:disable-next-line:max-line-length
            { data: [0].concat(this.wizard.historicDraw), label: 'Draws', backgroundColor: 'gold', fill: false, borderColor: 'gold' }],
        };


        this.loadingWizard = false;
    }

    public setWizardStats(stats: Stats) {
        this.stats = stats;

        // tslint:disable-next-line:max-line-length
        this.datasetPower = {
            labels: stats.readableDates,
            // tslint:disable-next-line:max-line-length
            datasets: [{ data: stats.powerPerDay.map((n: number) => this.getReadablePower(n)), label: 'Power', backgroundColor: 'green', fill: false, borderColor: 'green' }],
        };

        const offsetWidth = document.getElementById('wizardstats-content');
        if (offsetWidth) {
            this.powerChartWidth = (offsetWidth.offsetWidth - 55) + 'px';
        }

        this.loadingStats = false;
    }

    public setOpenSeaAsset(asset: OpenSeaAsset) {
        this.openSeaAsset = asset;
        this.loadingAsset = false;
    }

    public setDuels(duels: Duel[]) {
        this.duels = duels;
        this.loadingDuels = false;
    }

    public get isForSale(): boolean {
        if (this.openSeaAsset !== null) {
            return (this.openSeaAsset.sell_orders !== null
                && this.openSeaAsset.sell_orders.length > 0)
                || (this.openSeaAsset.orders !== null
                    && this.openSeaAsset.orders.length > 0);
        }
        return false;
    }

    public get wizardSpellProbabilities(): number[][][] {
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
                calculatedMoves[i][j].push(this.wizard.commonMoves[index], this.wizard.commonMovesProbabilities[index]);
                index++;
            }
        }
        return calculatedMoves;
    }

    public get getWizardAffinity(): number {
        return this.wizard.affinity;
    }

    public get wizardBattles(): number {
        return Math.max(this.wizard.wins + this.wizard.losses + this.wizard.draws, 1);
    }

    public get getWizardId(): number {
        return this.wizard.id;
    }

    public get getWizardPower(): string {
        const power1 = this.wizard.power.toString().substring(0, this.wizard.power.toString().length - 12);
        const power2 = this.wizard.power.toString().substring(power1.length, this.wizard.power.toString().length - 9);
        return power1;
    }

    public getReadablePower(power: number): number {
        const power1 = power.toString().substring(0, power.toString().length - 12);
        return +power1;
    }

}
