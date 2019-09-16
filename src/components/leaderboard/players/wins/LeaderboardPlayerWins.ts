import { Component, Vue, Prop } from 'vue-property-decorator';
import Player from '@/shared/models/Player';

@Component({})
export default class LeaderboardPlayerWinsComponent extends Vue {
    @Prop()
    public loading!: boolean;
    @Prop()
    public players!: Player[];

    constructor() {
        super();
    }

}
