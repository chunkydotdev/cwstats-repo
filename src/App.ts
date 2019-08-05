import { Component, Vue, Watch } from 'vue-property-decorator';
import router from '@/router';

@Component({})
export default class App extends Vue {
    public wizardId: number;
    public currentRoute: string | undefined;

    constructor() {
        super();

        // @ts-ignore
        this.wizardId = null;

        this.currentRoute = router.currentRoute.name;
    }

    @Watch('$route')
    public onRouteChange() {
        this.currentRoute = router.currentRoute.name;
    }

    public lookupWizardById() {
        let id = this.wizardId.toString();
        if (id.substring(0, 1) === '0') {
            id = id.substring(1);
        }
        router.push('/wizards/' + id);
    }
}
