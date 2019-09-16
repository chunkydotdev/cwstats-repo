import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class CookieFooterComponent extends Vue {
    public showCookieMessage: boolean;
    private allCookies: string;

    constructor() {
        super();

        this.showCookieMessage = true;
        this.allCookies = document.cookie;
        const cookiesAccepted = this.allCookies.indexOf('AcceptedCookies') >= 0;
        if (cookiesAccepted) {
            this.showCookieMessage = false;
        }
    }

    public acceptCookies() {
        document.cookie = 'AcceptedCookies';
        this.showCookieMessage = false;
    }
}
