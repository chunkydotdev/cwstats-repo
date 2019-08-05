import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import router from '@/router';
import Duel from '@/shared/models/Duel';
import WizardService from '@/services/wizard.service';
import ApiResponse from '@/shared/models/ApiResponse';
import DuelDataWizardComponent from './wizard/DuelDataWizard';

@Component({
    components: {
        DuelDataWizardComponent,
    },
})
export default class DuelComponents extends Vue {
    @Prop()
    public duel!: Duel;

    @Prop()
    public wizard!: Wizard;

    public wizard2: Wizard;
    public wizardService: WizardService;
    public expanded: boolean;

    constructor() {
        super();

        this.expanded = false;
        this.wizard2 = { id: 0, affinity: 0, power: '', owner: '' };
        this.wizardService = new WizardService();

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.duel.wiz2Id).then((response: ApiResponse<Wizard>) => this.setWizard2(response.result));
    }

    public setWizard2(wizard: Wizard) {
        this.wizard2 = wizard;
    }
}
