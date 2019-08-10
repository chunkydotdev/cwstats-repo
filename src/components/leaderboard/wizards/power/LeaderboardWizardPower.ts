import { Component, Vue, Prop } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import { OpenSeaAsset } from '@/shared/models/OpenseaAsset';
import OpenSeaService from '@/services/opensea.service';
import WizardService from '@/services/wizard.service';
import LeaderboardWizard from '@/shared/models/LeadeboardWizard';

@Component({})
export default class LeaderboardWizardPowerComponent extends Vue {
    @Prop()
    public loading!: boolean;
    @Prop()
    public wizards!: Wizard[];

    public openSeaWizards: OpenSeaAsset[];
    public openSeaService: OpenSeaService;
    public wizardAssets: LeaderboardWizard[];

    constructor() {
        super();
        this.openSeaWizards = [];
        this.openSeaService = new OpenSeaService();
        this.wizardAssets = [];
        this.wizards.forEach((wizard: Wizard) => this.wizardAssets.push({ wizard, forSale: false }));

        const wizardIds = this.wizards.map((w: Wizard) => w.id);
        // tslint:disable-next-line:max-line-length
        this.openSeaService.getWizards(wizardIds, 100, 0).then((response: any) => this.setOpenSeaWizards(response.assets));

    }

    public formatWizardPower(power: number): string {
        return power.toString().substring(0, power.toString().length - 12);
    }

    public setOpenSeaWizards(wizards: OpenSeaAsset[]) {
        wizards.forEach((w: OpenSeaAsset) => {
            const wAssetIndex = this.wizardAssets.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            if (wAssetIndex >= 0) {
                const wa = this.wizardAssets[wAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.wizardAssets.splice(wAssetIndex, 1, wa);
            }
        });
    }

}
