import { Component, Vue, Prop } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';

@Component({})
export default class LeaderboardWizardPowerComponent extends Vue {
    @Prop()
    public loading!: boolean;
    @Prop()
    public wizards!: Wizard[];

    constructor() {
        super();

    }

    public formatWizardPower(power: number): string {
        return power.toString().substring(0, power.toString().length - 12);
    }

}
