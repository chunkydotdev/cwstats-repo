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
    public basicWizards: Wizard[];
    public fireWizards: Wizard[];
    public waterWizards: Wizard[];
    public windWizards: Wizard[];
    public duels: Duel[];
    public player: Player;

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

        // tslint:disable-next-line:max-line-length
        this.service.getPlayer(this.playerAddress).then((response: ApiResponse<Player>) => this.setPlayer(response.result));

        // tslint:disable-next-line:max-line-length
        this.service.getWizardsByOwner(this.playerAddress).then((response: ApiResponse<Wizard[]>) => this.setWizards(response.result));
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
                this.basicWizards.push(wizard);
            } else if (a === 2) {
                this.fireWizards.push(wizard);
            } else if (a === 3) {
                this.waterWizards.push(wizard);
            } else if (a === 4) {
                this.windWizards.push(wizard);
            }
        });
    }
}
