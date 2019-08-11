import { Component, Vue, Watch } from 'vue-property-decorator';
import router from '@/router';
import FooterComponent from './views/shared/footer/Footer';

@Component({
    components: {
        FooterComponent,
    },
})
export default class App extends Vue {
    public searchTerm: string;
    public searchCategory: string;
    public searchCategories: string[];
    public placeholder: string;
    public currentRoute: string | undefined;

    constructor() {
        super();

        this.searchTerm = '';
        this.searchCategories = ['wizard', 'player'];
        this.searchCategory = this.searchCategories[0];
        this.placeholder = 'Id...';

        this.currentRoute = router.currentRoute.name;
    }

    @Watch('$route')
    public onRouteChange() {
        this.currentRoute = router.currentRoute.name;
    }

    @Watch('searchCategory')
    public onSearchCategoryChange() {
        if (this.searchCategory === 'wizard') {
            this.placeholder = 'Id...';
        } else {
            this.placeholder = 'Address...';
        }
    }

    public lookup() {
        if (this.searchCategory === 'wizard') {
            let id = this.searchTerm;
            if (id.substring(0, 1) === '0') {
                id = id.substring(1);
            }
            router.push('/wizards/' + id);
        } else {
            router.push('/players/' + this.searchTerm);
        }
    }
}
