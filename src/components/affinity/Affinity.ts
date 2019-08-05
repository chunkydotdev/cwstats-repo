import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class AffinityComponent extends Vue {
    @Prop()
    public affinity!: number;
    @Prop({
        default: false,
    })
    public small!: boolean;

    constructor() {
        super();
    }

    public get getAffinityName(): string {
        if (this.affinity === 1) {
            return 'Basic';
        } else if (this.affinity === 2) {
            return 'Fire';
        } else if (this.affinity === 3) {
            return 'Water';
        } else {
            return 'Wind';
        }
    }

}
