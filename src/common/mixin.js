import {
    debounce
} from "./utils";
import backTop from "../components/content/backTop/backTop";

export const itemMixin = {
    data() {
        return {
            refresh: null
        }
    },
    mounted() {
        // this.refresh = debounce(this.$refs.scrolls.refresh, 100);
    }
}

export const backTopMixin = {
    components: {
        backTop
    },
    data() {
        return {
            isShowBack: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scrolls.scrollTo(0, 0, 500);
        },
    }
}