import { Component, Vue, Watch } from 'vue-property-decorator';
import WizardImageComponent from '../../components/wizard/WizardImage';
import router from '@/router';
import { Wizard } from '@/shared/models/Wizard';
import WizardService from '@/services/wizard.service';
import ApiResponse from '@/shared/models/ApiResponse';
import AffinityComponent from '@/components/affinity/Affinity';
import { testDuels } from '@/shared/models/DuelTestData';
import DuelComponent from '@/components/duel/Duel';
import Duel from '@/shared/models/Duel';

@Component({
    components: {
        WizardImageComponent,
        AffinityComponent,
        DuelComponent,
    },
})
export default class WizardStatsComponent extends Vue {
    public wizardId: number;
    public wizard: Wizard;
    public wizardService: WizardService;
    public duels: Duel[];

    constructor() {
        super();

        this.wizardService = new WizardService();

        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];
        this.wizard = { id: 0, affinity: 0, power: '', owner: '' };

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));

        this.duels = testDuels;
    }

    @Watch('$route')
    public onRouteChange() {
        // tslint:disable-next-line:no-string-literal
        this.wizardId = +router.currentRoute.params['id'];

        // tslint:disable-next-line:max-line-length
        this.wizardService.getWizardById(this.wizardId).then((response: ApiResponse<Wizard>) => this.setWizard(response.result));
    }

    public setWizard(wizard: Wizard) {
        this.wizard = wizard;
    }

    public get getWizardAffinity(): number {
        return this.wizard.affinity;
    }

    public get getWizardId(): number {
        return this.wizard.id;
    }

    public get getWizardPower(): string {
        const power1 = this.wizard.power.substring(0, this.wizard.power.length - 12);
        const power2 = this.wizard.power.substring(power1.length, this.wizard.power.length - 9);
        return power1;
    }

    public get getMostCommonSpellCombination(): number[] {
        const movesets: number[][] = [];
        const countMoveSets: number[] = [];

        // put distinct movesets in movesets
        this.duels.forEach((duel: Duel) => {
            if (duel.wiz1Id === this.getWizardId) {
                const movesetIndex = movesets.findIndex((set) => {
                    return set === duel.moveSet1;
                });
                if (movesetIndex < 0) {
                    movesets.push(duel.moveSet1);
                    countMoveSets.push(1);
                } else {
                    countMoveSets[movesetIndex]++;
                }

            } else {
                const movesetIndex = movesets.findIndex((set) => {
                    return set === duel.moveSet2;
                });
                if (movesetIndex < 0) {
                    movesets.push(duel.moveSet2);
                    countMoveSets.push(1);
                } else {
                    countMoveSets[movesetIndex]++;
                }
            }
        });

        let mostCommonMovesetIndex = 0;
        countMoveSets.forEach((count, index) => {
            if (count > countMoveSets[mostCommonMovesetIndex]) {
                mostCommonMovesetIndex = index;
            }
        });

        return movesets[mostCommonMovesetIndex];
    }

    public get getMostCommonSpell(): number {
        let countFire = 0;
        let countWater = 0;
        let countWind = 0;

        this.duels.forEach((duel: Duel) => {
            if (duel.wiz1Id === this.getWizardId) {
                duel.moveSet1.forEach((move: number) => {
                    if (move === 1) {
                        countFire++;
                    } else if (move === 2) {
                        countWater++;
                    } else if (move === 3) {
                        countWind++;
                    }
                });
            } else {
                duel.moveSet2.forEach((move: number) => {
                    if (move === 1) {
                        countFire++;
                    } else if (move === 2) {
                        countWater++;
                    } else if (move === 3) {
                        countWind++;
                    }
                });
            }
        });

        if (countFire >= countWater && countFire >= countWind) {
            // fire
            return 1;
        } else if (countWater >= countWind) {
            // water
            return 2;
        } else {
            // wind
            return 3;
        }
    }
}
