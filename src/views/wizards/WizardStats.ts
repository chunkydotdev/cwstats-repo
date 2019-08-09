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

    constructor() {
        super();

        this.wizardService = new WizardService();

        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        // tslint:disable-next-line:max-line-length
        this.wizard = { id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [2, 2, 2, 2, 2], commonMove: 2, wins: 0, losses: 0, draws: 0, duelCount: 0 };
        this.duels = [];

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));

        // tslint:disable-next-line:max-line-length
        this.wizardService.getDuels([this.wizardId]).then((response: ApiResponse<Duel[]>) => this.setDuels(response.result));
    }

    @Watch('$route')
    public onRouteChange() {
        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));
    }

    public setWizard(wizard: Wizard) {
        this.wizard = wizard;
    }

    public setDuels(duels: Duel[]) {
        this.duels = duels;
    }

    public get getWizardAffinity(): number {
        return this.wizard.affinity;
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