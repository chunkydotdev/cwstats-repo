import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';

@Component({})
export default class Home extends Vue {
    public wizardId: number;

    constructor() {
        super();

        this.wizardId = 0;
    }

    public lookupWizardById() {
        router.push('wizards/' + this.wizardId);
    }
}
