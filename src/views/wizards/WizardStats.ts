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

@Component({
    components: {
        WizardImageComponent,
        AffinityComponent,
        SpellComponent,
        DuelComponent,
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

    constructor() {
        super();

        this.wizardService = new WizardService();
        this.openSeaService = new OpenSeaService();
        this.loadingWizard = true;
        this.loadingDuels = true;

        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        // tslint:disable-next-line:max-line-length
        this.wizard = { id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [], commonMoves: [], commonMovesProbabilities: [], wins: 0, losses: 0, draws: 0, duelCount: 0 };
        this.openSeaAsset = null;
        this.duels = [];

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));

    }

    @Watch('$route')
    public onRouteChange() {
        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        this.duels = [];
        this.loadingWizard = true;
        this.loadingDuels = true;
        this.openSeaAsset = null;

        // tslint:disable-next-line:max-line-length
        this.wizard = { id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [], commonMoves: [], commonMovesProbabilities: [], wins: 0, losses: 0, draws: 0, duelCount: 0 };

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));

    }

    public setWizard(wizard: Wizard) {
        this.wizard = wizard;
        this.loadingWizard = false;

        // tslint:disable-next-line:max-line-length
        this.wizardService.getDuels([this.wizardId]).then((response: ApiResponse<Duel[]>) => this.setDuels(response.result));

        this.openSeaService.getWizard(this.wizardId).then((response: any) => this.setOpenSeaAsset(response));
    }

    public setOpenSeaAsset(asset: OpenSeaAsset) {
        this.openSeaAsset = asset;
    }

    public setDuels(duels: Duel[]) {
        this.duels = duels;
        this.loadingDuels = false;
    }

    public get isForSale(): boolean {
        // tslint:disable-next-line:max-line-length
        if (!!this.openSeaAsset) {
            return (!!this.openSeaAsset.sell_orders || !!this.openSeaAsset.orders);
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
}
