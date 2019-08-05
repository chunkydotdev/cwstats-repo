import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class SpellComponent extends Vue {
    @Prop()
    public affinity!: number;

    @Prop({
        default: false,
    })
    public win!: boolean;

    @Prop({
        default: false,
    })
    public critical!: boolean;

    @Prop({
        default: false,
    })
    public color!: boolean;


    constructor() {
        super();
    }

}
