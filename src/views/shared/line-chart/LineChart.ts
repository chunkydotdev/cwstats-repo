import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Line } from 'vue-chartjs';
// @ts-ignore
import LineComponent from './Line';
import { DataCollection } from '../../../shared/models/ChartDataCollection';

@Component({
    components: {
        LineComponent,
    },
})
export default class LineChartComponent extends Vue {
    @Prop()
    public datacollection!: DataCollection;
    @Prop()
    public width!: string;

    public defaultOptions: any;

    constructor() {
        super();

        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
    }

    public get defaultStyles(): any {
        return {
            height: '255px',
            width: this.width,
            position: 'relative',
        };

    }
}
