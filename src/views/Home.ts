import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import WizardService from '@/services/wizard.service';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';

@Component({})
export default class Home extends Vue {
    public wizardId: number;
    public service: WizardService;
    public topWizards: Wizard[];

    constructor() {
        super();

        this.wizardId = 0;
        this.service = new WizardService();
        this.topWizards = [];

        // tslint:disable-next-line:max-line-length
        this.service.getTopWizardsByPower(100).then((response: ApiResponse<Wizard[]>) => this.setTopWizards(response.result));
    }

    public formatWizardPower(power: number): string {
        return power.toString().substring(0, power.toString().length - 12);
    }

    public setTopWizards(wizards: Wizard[]) {
        this.topWizards = wizards.sort((w1, w2) => {
            const p1 = Number.parseInt(w1.power, 10);
            const p2 = Number.parseInt(w2.power, 10);
            return p2 - p1;
        });
    }

    public lookupWizardById() {
        let id = this.wizardId.toString();
        if (id.substring(0, 1) === '0') {
            id = id.substring(1);
        }
        router.push('wizards/' + id);
    }
}