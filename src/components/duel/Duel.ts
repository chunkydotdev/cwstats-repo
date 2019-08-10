import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import router from '@/router';
import Duel from '@/shared/models/Duel';
import WizardService from '@/services/wizard.service';
import ApiResponse from '@/shared/models/ApiResponse';
import DuelDataWizardComponent from './wizard/DuelDataWizard';
import DuelDataPlayerComponent from './player/DuelDataPlayer';
import Player from '@/shared/models/Player';

@Component({
    components: {
        DuelDataWizardComponent,
        DuelDataPlayerComponent,
    },
})
export default class DuelComponent extends Vue {
    @Prop()
    public duel!: Duel;

    @Prop()
    public wizard!: Wizard;

    public wizard2: Wizard;
    public wizardService: WizardService;
    public expanded: boolean;
    public category: string;

    public player1: Player;
    public player2: Player;
    public loadingPlayer1: boolean;
    public loadingPlayer2: boolean;

    constructor() {
        super();

        this.loadingPlayer1 = true;
        this.loadingPlayer2 = true;

        // tslint:disable-next-line:max-line-length
        this.player1 = { address: '', wins: 0, losses: 0, draws: 0, duelCount: 0, wizardCount: 0, wizardPowerSum: 0, windMoveSet: [], waterMoveSet: [], basicMoveSet: [], fireMoveSet: [] };
        // tslint:disable-next-line:max-line-length
        this.player2 = { address: '', wins: 0, losses: 0, draws: 0, duelCount: 0, wizardCount: 0, wizardPowerSum: 0, windMoveSet: [], waterMoveSet: [], basicMoveSet: [], fireMoveSet: [] };

        this.expanded = false;
        this.category = 'wizards';
        // tslint:disable-next-line:max-line-length
        this.wizard2 = { id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [], commonMove: 0, wins: 0, losses: 0, draws: 0, duelCount: 0 };
        this.wizardService = new WizardService();

        // tslint:disable-next-line:max-line-length
        this.wizardService.getPlayer(this.wizard.owner).then((response: ApiResponse<Player>) => this.setPlayer1(response.result));

        if (this.wizard.id === this.duel.wiz1Id) {
            // tslint:disable-next-line:max-line-length
            this.wizardService.getWizardById(this.duel.wiz2Id).then((response: ApiResponse<Wizard>) => this.setWizard2(response.result));
        } else {
            // tslint:disable-next-line:max-line-length
            this.wizardService.getWizardById(this.duel.wiz1Id).then((response: ApiResponse<Wizard>) => this.setWizard2(response.result));
        }
    }

    public get loadingPlayers(): boolean {
        return this.loadingPlayer1 && this.loadingPlayer2;
    }

    public get isWizardsActive(): boolean {
        return this.category === 'wizards';
    }

    public get isPlayersActive(): boolean {
        return this.category === 'players';
    }

    public get getWizardsSelectionIcon(): string {
        if (this.isWizardsActive) {
            return '../../assets/book-dark.svg';
        }
        return '../../assets/book-color.svg';
    }

    public setWizard2(wizard: Wizard) {
        this.wizard2 = wizard;

        // tslint:disable-next-line:max-line-length
        this.wizardService.getPlayer(this.wizard2.owner).then((response: ApiResponse<Player>) => this.setPlayer2(response.result));
    }

    public setPlayer1(player: Player) {
        this.player1 = player;
        this.loadingPlayer1 = false;
    }

    public setPlayer2(player: Player) {
        this.player2 = player;
        this.loadingPlayer2 = false;
    }

    public get isWin(): boolean {
        // tslint:disable-next-line:max-line-length
        return (this.duel.wiz1Id === this.wizard.id && this.duel.wiz1Win) || (this.duel.wiz2Id === this.wizard.id && !this.duel.wiz1Win);
    }

    public get isDraw(): boolean {
        return this.duel.wiz1PowerChange === 0;
    }

    public get isLoss(): boolean {
        return !this.isDraw && !this.isWin;
    }
}
