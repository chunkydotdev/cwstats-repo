import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({
})
export default class PercentageLineComponent extends Vue {
    @Prop()
    public prefix!: string;
    @Prop()
    public percentage!: number;
    @Prop()
    public placement!: number;
    @Prop()
    public max!: number;

    constructor() {
        super();

        let fill1 = document.getElementById('fill-1-' + this.prefix);
        if (fill1) {
            fill1.style.width = (100 - this.percentage) + '%';
        }

        this.$nextTick(() => {
            fill1 = document.getElementById('fill-1-' + this.prefix);
            if (fill1) {
                fill1.style.width = (100 - this.percentage) + '%';
            }
        });

    }

}
