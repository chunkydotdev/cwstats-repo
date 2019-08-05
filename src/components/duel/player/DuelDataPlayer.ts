import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import Duel from '@/shared/models/Duel';
import AffinityComponent from '../../affinity/Affinity';
import SpellComponent from '../../spell/Spell';

@Component({
    components: {
        AffinityComponent,
        SpellComponent,
    },
})
export default class DuelDataWizardComponents extends Vue {
    @Prop()
    public duel!: Duel;

    @Prop()
    public wizard!: Wizard;

    @Prop()
    public wizard2!: Wizard;

    constructor() {
        super();
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

    public get wiz1pts(): number {
        if (this.duel.wiz1Id > 0) {
            let pts = 0;
            for (let i = 0; i < 3; i++) {
                if (this.calculateSpellWinDrawLoss(this.duel.moveSet1[i], this.duel.moveSet2[i]) > 0) {
                    pts++;
                }
            }
            return pts;
        }
        return 0;
    }

    public get wiz1pwr(): string {
        if (this.duel.wiz1Id > 0) {
            const power1 = this.wizard.power.substring(0, this.wizard.power.length - 12);
            const power2 = this.wizard.power.substring(power1.length, this.wizard.power.length - 9);
            return power1;
        }
        return '0';
    }

    public get wiz2pts(): number {
        if (this.duel.wiz2Id > 0) {
            let pts = 0;
            for (let i = 0; i < 3; i++) {
                if (this.calculateSpellWinDrawLoss(this.duel.moveSet2[i], this.duel.moveSet1[i]) > 0) {
                    pts++;
                }
            }
            return pts;
        }
        return 0;
    }

    public get wiz2pwr(): string {
        if (this.duel.wiz2Id > 0) {
            const power1 = this.wizard2.power.substring(0, this.wizard2.power.length - 12);
            const power2 = this.wizard2.power.substring(power1.length, this.wizard2.power.length - 9);
            return power1;
        }
        return '0';
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
            return this.duel.moveSet1[index] + 1 === this.wizard.affinity;
        } else {
            return this.duel.moveSet2[index] + 1 === this.wizard2.affinity;
        }
    }

    private calculateSpellWinDrawLoss(spell1: number, spell2: number): number {
        if (spell1 === 1) {
            if (spell2 === 2) {
                return -1;
            } else if (spell2 === 3) {
                return 1;
            } else {
                return 0;
            }
        } else if (spell1 === 2) {
            if (spell2 === 3) {
                return -1;
            } else if (spell2 === 1) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (spell2 === 1) {
                return -1;
            } else if (spell2 === 2) {
                return 1;
            } else {
                return 0;
            }
        }
    }


}
