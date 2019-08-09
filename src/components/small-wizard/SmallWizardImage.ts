import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import router from '@/router';

@Component({})
export default class SmallWizardImageComponent extends Vue {
    @Prop()
    public wizard!: Wizard;

    constructor() {
        super();
    }

    public get imageUrl(): string {
        if (this.wizard.id > 0) {
            // tslint:disable-next-line:max-line-length
            return `https://storage.googleapis.com/cheeze-wizards-production/0xec2203e38116f09e21bc27443e063b623b01345a/${ this.wizard.id }.svg`;
        }
        return '';
    }

    public get getWizardPower(): string {
        const power1 = this.wizard.power.toString().substring(0, this.wizard.power.toString().length - 12);
        const power2 = this.wizard.power.toString().substring(power1.length, this.wizard.power.length - 9);
        return power1;
    }

}
