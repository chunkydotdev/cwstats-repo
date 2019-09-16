import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import router from '@/router';
import AffinityComponent from '../affinity/Affinity';

@Component({
    components: {
        AffinityComponent,
    },
})
export default class WizardImageComponent extends Vue {
    @Prop()
    public affinity!: number;
    @Prop()
    public id!: number;
    @Prop()
    public loading!: boolean;
    @Prop()
    public loadingAsset!: boolean;
    @Prop()
    public forSale!: boolean;

    constructor() {
        super();
    }

    public get imageUrl(): string {
        if (this.id > 0) {
            // tslint:disable-next-line:max-line-length
            return `https://storage.googleapis.com/cheeze-wizards-production/0xec2203e38116f09e21bc27443e063b623b01345a/${ this.id }.svg`;
        }
        return '';
    }

}
