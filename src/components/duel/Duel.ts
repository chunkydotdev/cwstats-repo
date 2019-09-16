import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import router from '@/router';
import Duel from '@/shared/models/Duel';
import WizardService from '@/services/wizard.service';
import ApiResponse from '@/shared/models/ApiResponse';
import DuelDataWizardComponent from './wizard/DuelDataWizard';
import SpellComponent from '../spell/Spell';
import Player from '@/shared/models/Player';

@Component({
    components: {
        DuelDataWizardComponent,
        SpellComponent,
    },
})
export default class DuelComponent extends Vue {
    @Prop()
    public rawDuel!: Duel;

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
        this.player1 = { address: '', wins: 0, losses: 0, draws: 0, duelCount: 0, wizardCount: 0, wizardPowerSum: 0, windMoves: [], waterMoves: [], basicMoves: [], fireMoves: [], windMoveProbabilities: [], waterMoveProbabilities: [], basicMoveProbabilities: [], fireMoveProbabilities: [] };
        // tslint:disable-next-line:max-line-length
        this.player2 = { address: '', wins: 0, losses: 0, draws: 0, duelCount: 0, wizardCount: 0, wizardPowerSum: 0, windMoves: [], waterMoves: [], basicMoves: [], fireMoves: [], windMoveProbabilities: [], waterMoveProbabilities: [], basicMoveProbabilities: [], fireMoveProbabilities: [] };

        this.expanded = false;
        this.category = 'wizards';
        // tslint:disable-next-line:max-line-length
        this.wizard2 = { historicPower: [], historicDraw: [], historicLoss: [], historicWin: [], id: 0, affinity: 0, power: '', owner: '', commonMoveSet: [], commonMoves: [], commonMovesProbabilities: [], wins: 0, losses: 0, draws: 0, duelCount: 0 };
        this.wizardService = new WizardService();

        // tslint:disable-next-line:max-line-length
        this.wizardService.getPlayer(this.wizard.owner).then((response: ApiResponse<Player>) => this.setPlayer1(response.result));

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.duel.wiz2Id).then((response: ApiResponse<Wizard>) => this.setWizard2(response.result));
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

    public get imageUrlWiz1(): string {
        if (this.duel.wiz1Id > 0) {
            // tslint:disable-next-line:max-line-length
            return `https://storage.googleapis.com/cheeze-wizards-production/0xec2203e38116f09e21bc27443e063b623b01345a/${ this.duel.wiz1Id }.svg`;
        }
        return '';
    }

    public get imageUrlWiz2(): string {
        if (this.duel.wiz2Id > 0) {
            // tslint:disable-next-line:max-line-length
            return `https://storage.googleapis.com/cheeze-wizards-production/0xec2203e38116f09e21bc27443e063b623b01345a/${ this.duel.wiz2Id }.svg`;
        }
        return '';
    }

    public get wiz1Spells(): number[] {
        if (!!this.duel) {
            return this.duel.moveSet1;
        }
        return [];
    }

    public get wiz2Spells(): number[] {
        if (!!this.duel) {
            return this.duel.moveSet2;
        }
        return [];
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
        return this.duel.wiz1PowerChange > 0;
    }

    public get isDraw(): boolean {
        return this.duel.wiz1PowerChange === 0;
    }

    public get isLoss(): boolean {
        return !this.isDraw && !this.isWin;
    }

    public readablePower(power: number) {
        const power1 = power.toString().substring(0, power.toString().length - 12);
        return power1;
    }

    public get duel(): Duel {
        return this.rawDuel;
    }

    public isSpellWin(index: number, wizard: number): boolean {
        let result = 0;
        if (wizard === 1) {
            result = this.calculateSpellWinDrawLoss(this.duel.moveSet1[index], this.duel.moveSet2[index]);
        } else {
            result = this.calculateSpellWinDrawLoss(this.duel.moveSet2[index], this.duel.moveSet1[index]);
        }

        return result === 1;

    }

    public isSpellCritical(index: number, wizard: number): boolean {
        if (wizard === 1) {
            return this.duel.moveSet1[index] === this.wizard.affinity;
        } else {
            return this.duel.moveSet2[index] === this.wizard2.affinity;
        }
    }

    private calculateSpellWinDrawLoss(spell1: number, spell2: number): number {
        if (spell1 === 2) {
            if (spell2 === 3) {
                return -1;
            } else if (spell2 === 4) {
                return 1;
            } else {
                return 0;
            }
        } else if (spell1 === 3) {
            if (spell2 === 4) {
                return -1;
            } else if (spell2 === 2) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (spell2 === 2) {
                return -1;
            } else if (spell2 === 3) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}
