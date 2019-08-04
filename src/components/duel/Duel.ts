import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import router from '@/router';
import Duel from '@/shared/models/Duel';
import AffinityComponent from '../affinity/Affinity';

@Component({
    components: {
        AffinityComponent,
    },
})
export default class DuelComponents extends Vue {
    @Prop()
    public duel!: Duel;

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
        let pts = 0;
        for (let i = 0; i < 3; i++) {
            if (this.calculateSpellWinDrawLoss(this.duel.moveSet1[i], this.duel.moveSet2[i]) > 0) {
                pts++;
            }
        }
        return pts;
    }

    public get wiz2pts(): number {
        let pts = 0;
        for (let i = 0; i < 3; i++) {
            if (this.calculateSpellWinDrawLoss(this.duel.moveSet2[i], this.duel.moveSet1[i]) > 0) {
                pts++;
            }
        }
        return pts;
    }

    public isSpellWinDrawLoss(index: number, wizard: number): string {
        let result = 0;
        if (wizard === 1) {
            result = this.calculateSpellWinDrawLoss(this.duel.moveSet1[index], this.duel.moveSet2[index]);
        } else {
            result = this.calculateSpellWinDrawLoss(this.duel.moveSet2[index], this.duel.moveSet1[index]);
        }

        if (result === 1) {
            return 'win';
        } else if (result === -1) {
            return 'loss';
        }

        return 'draw';
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
