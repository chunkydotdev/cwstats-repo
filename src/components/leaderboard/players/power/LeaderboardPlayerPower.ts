import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/shared/models/Player';

@Component({})
export default class LeaderboardPlayerPowerComponent extends Vue {
    @Prop()
    public loading!: boolean;
    @Prop()
    public players!: Player[];

    constructor() {
        super();
    }

    public formatPower(power: number): string {
        return power.toString().substring(0, power.toString().length - 12);
    }

}
