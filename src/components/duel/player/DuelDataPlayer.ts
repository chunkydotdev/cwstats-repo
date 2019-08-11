import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import Duel from '@/shared/models/Duel';
import AffinityComponent from '../../affinity/Affinity';
import SpellComponent from '../../spell/Spell';
import Player from '@/shared/models/Player';

@Component({
    components: {
        AffinityComponent,
        SpellComponent,
    },
})
export default class DuelDataPlayerComponent extends Vue {
    @Prop()
    public expanded!: boolean;
    @Prop()
    public duel!: Duel;
    @Prop()
    public player1!: Player;
    @Prop()
    public player2!: Player;

    constructor() {
        super();
    }

    public readablePower(power: number) {
        if (!!power) {
            const power1 = power.toString().substring(0, power.toString().length - 12);
            return power1;
        }
        return 0;
    }

}
