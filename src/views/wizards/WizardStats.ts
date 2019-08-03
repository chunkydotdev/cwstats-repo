import { Component, Vue } from 'vue-property-decorator';
import WizardImageComponent from '../../components/wizard/WizardImage';
import router from '@/router';
import { Wizard } from '@/shared/models/Wizard';
import WizardService from '@/services/wizard.service';
import ApiResponse from '@/shared/models/ApiResponse';

@Component({
    components: {
        WizardImageComponent,
    },
})
export default class WizardStatsComponent extends Vue {
    public wizardId: number;
    public wizard: Wizard;
    public wizardService: WizardService;

    constructor() {
        super();

        this.wizardService = new WizardService();

        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        this.wizard = { id: '0', affinity: 0, power: '', owner: '' };

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));
    }

    public setWizard(wizard: Wizard) {
        this.wizard = wizard;
    }

    public get getWizardAffinity(): number {
        return this.wizard.affinity;
    }

    public get getWizardId(): string {
        return this.wizard.id;
    }

    public get getWizardPower(): string {
        return this.wizard.power.substring(0, 5);
    }
}
