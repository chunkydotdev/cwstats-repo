import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import WizardService from '@/services/wizard.service';
import { Wizard } from '@/shared/models/Wizard';
import ApiResponse from '@/shared/models/ApiResponse';
import Player from '@/shared/models/Player';
import Duel from '@/shared/models/Duel';
import PlayerImageComponent from '../../components/player/PlayerImage';
import SpellComponent from '../../components/spell/Spell';
import SmallWizardImageComponent from '../../components/small-wizard/SmallWizardImage';
import web3 from 'web3';
import OpenSeaService from '@/services/opensea.service';
import LeaderboardWizard from '@/shared/models/LeadeboardWizard';
import { OpenSeaAsset } from '@/shared/models/OpenseaAsset';

@Component({
    components: {
        PlayerImageComponent,
        SpellComponent,
        SmallWizardImageComponent,
    },
})
export default class PlayerStatsComponent extends Vue {
    public playerAddress: string;
    public service: WizardService;
    public wizards: Wizard[];
    public basicWizards: LeaderboardWizard[];
    public fireWizards: LeaderboardWizard[];
    public waterWizards: LeaderboardWizard[];
    public windWizards: LeaderboardWizard[];
    public duels: Duel[];
    public player: Player;
    public openSeaService: OpenSeaService;
    public openSeaAssets: OpenSeaAsset[];

    constructor() {
        super();

        this.playerAddress = web3.utils.toChecksumAddress(router.currentRoute.params.address);
        this.service = new WizardService();
        // tslint:disable-next-line:max-line-length
        this.player = { address: '', wins: 0, losses: 0, draws: 0, duelCount: 0, wizardCount: 0, wizardPowerSum: 0, windMoveSet: [], waterMoveSet: [], basicMoveSet: [], fireMoveSet: [] };
        this.wizards = [];
        this.basicWizards = [];
        this.fireWizards = [];
        this.waterWizards = [];
        this.windWizards = [];
        this.duels = [];
        this.openSeaAssets = [];

        this.openSeaService = new OpenSeaService();

        // tslint:disable-next-line:max-line-length
        this.service.getPlayer(this.playerAddress).then((response: ApiResponse<Player>) => this.setPlayer(response.result));

        // tslint:disable-next-line:max-line-length
        this.service.getWizardsByOwner(this.playerAddress).then((response: ApiResponse<Wizard[]>) => this.setWizards(response.result));
    }

    public get playerBattles(): number {
        return Math.max(this.player.wins + this.player.draws + this.player.losses, 1);
    }

    public setPlayer(player: Player) {
        this.player = player;
    }

    public setWizards(wizards: Wizard[]) {
        this.wizards = wizards;
        this.basicWizards = [];
        this.fireWizards = [];
        this.waterWizards = [];
        this.windWizards = [];

        wizards.forEach((wizard: Wizard) => {
            const a = wizard.affinity;
            if (a === 1) {
                this.basicWizards.push({ wizard, forSale: false });
            } else if (a === 2) {
                this.fireWizards.push({ wizard, forSale: false });
            } else if (a === 3) {
                this.waterWizards.push({ wizard, forSale: false });
            } else if (a === 4) {
                this.windWizards.push({ wizard, forSale: false });
            }
        });

        this.getAllOpenSeaAssets();
    }

    public getAllOpenSeaAssets() {
        this.openSeaAssets = [];
        const assetBatches: number[][] = [];
        const wizCount = this.wizards.length;
        for (let i = 0; i < wizCount; i += 200) {
            assetBatches.push(this.wizards.slice(i, i + 200).map((w: Wizard) => w.id));
        }
        assetBatches.forEach((assets: number[], index: number) => {
            // tslint:disable-next-line:max-line-length
            this.openSeaService.getWizards(assets, 200, index).then((response: ApiResponse<OpenSeaAsset[]>) => this.addOpenSeaAssets(response.result));
        });
    }

    public addOpenSeaAssets(assets: OpenSeaAsset[]) {
        assets.forEach((w: OpenSeaAsset) => {
            const basicAssetIndex = this.basicWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            const fireAssetIndex = this.fireWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            const waterAssetIndex = this.waterWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            const windAssetIndex = this.windWizards.findIndex((a: LeaderboardWizard) => a.wizard.id === +w.token_id);
            if (basicAssetIndex >= 0) {
                const wa = this.basicWizards[basicAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.basicWizards.splice(basicAssetIndex, 1, wa);
            } else if (fireAssetIndex >= 0) {
                const wa = this.fireWizards[fireAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.fireWizards.splice(fireAssetIndex, 1, wa);
            } else if (waterAssetIndex >= 0) {
                const wa = this.waterWizards[waterAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.waterWizards.splice(waterAssetIndex, 1, wa);
            } else if (windAssetIndex >= 0) {
                const wa = this.windWizards[windAssetIndex];
                wa.forSale = w.sell_orders !== null && w.sell_orders.length > 0;
                this.windWizards.splice(windAssetIndex, 1, wa);
            }
        });
    }
}
