import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Wizard } from '@/shared/models/Wizard';
import Duel from '@/shared/models/Duel';
import AffinityComponent from '../../affinity/Affinity';
import SpellComponent from '../../spell/Spell';
// @ts-ignore
import TrendChart from 'vue-trend-chart';
import Popper from 'popper.js';

@Component({
    components: {
        AffinityComponent,
        SpellComponent,
        TrendChart,
    },
})
export default class DuelDataWizardComponent extends Vue {
    @Prop()
    public duel!: Duel;

    @Prop()
    public wizard!: Wizard;

    @Prop()
    public wizard2!: Wizard;

    @Prop()
    public expanded!: boolean;

    // for the graph
    public datasets: Array<{ data: number[], smooth: boolean, fill: boolean, showPoints: boolean }>;
    public grid: { verticalLines: boolean, horizontalLines: boolean };
    public labels: { xLabels: string[], yLabels: number };
    public min: number;
    public max: number;

    private tooltipData: MouseEvent | null;
    private popper: Popper | null;
    private popperIsActive: boolean;

    constructor() {
        super();

        this.min = 0;
        this.max = 0;
        this.duel.historicScores.forEach((s: number) => {
            if (s < this.min) {
                this.min = s;
            }
            if (s > this.max) {
                this.max = s;
            }
        });

        this.min = -Math.max(-this.min, this.max);
        this.max = -this.min;
        this.grid = { verticalLines: true, horizontalLines: true };
        this.labels = { xLabels: ['start', 'S1', 'S2', 'S3', 'S4', 'S5'], yLabels: 3 };
        this.datasets = [{ smooth: false, fill: false, data: [0].concat(this.duel.historicScores), showPoints: true }];
        this.tooltipData = null;
        this.popperIsActive = false;
        this.popper = null;
        this.$nextTick(() => {
            this.popper = this.initPopper();
        });
    }

    public get scoreChartId(): string {
        return 'historic-duel-chart-' + this.duel.duelId;
    }

    public get wiz1pwr(): string {
        if (this.duel.wiz1Id > 0) {
            const power1 = this.duel.power1.toString().substring(0, this.wizard.power.toString().length - 12);
            return power1;
        }
        return '0';
    }

    public get wiz2pwr(): string {
        if (this.duel.wiz2Id > 0) {
            const power1 = this.duel.power2.toString().substring(0, this.wizard2.power.toString().length - 12);
            return power1;
        }
        return '0';
    }

    public readablePower(power: number) {
        const power1 = power.toString().substring(0, power.toString().length - 12);
        return power1;
    }

    private initPopper() {
        const chart = document.querySelector('#' + this.scoreChartId);
        if (!!chart) {
            const ref = chart.querySelector('.active-line');
            if (!!ref) {
                const tooltip = this.$refs['tooltip' + this.duel.duelId] as Element;
                return new Popper(ref, tooltip, {
                    placement: 'right',
                    modifiers: {
                        offset: { offset: '0,10' },
                        preventOverflow: {
                            boundariesElement: chart,
                        },
                    },
                });
            }
        }
        return null;
    }

    private onMouseMove(params: MouseEvent) {
        this.popperIsActive = !!params;
        if (!!this.popper) {
            this.popper.scheduleUpdate();
        } else {
            this.popper = this.initPopper();
        }
        this.tooltipData = params || null;
    }

}
