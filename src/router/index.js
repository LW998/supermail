import Vue from 'vue'
import VueRouter from 'vue-router'


const home = () =>
    import ('../views/Home/home')
const category = () =>
    import ('../views/Category/category')
const cart = () =>
    import ('../views/Cart/cart')
const profile = () =>
    import ('../views/Profile/profile')
const detail = () =>
    import ('../views/detail/detail')

Vue.use(VueRouter);


const routes = [{
        path: '/',
        redirect: '/home',
    }, {
        path: '/home',
        component: home,
        meta: {
            title: '首页'
        }
    }, {
        path: '/category',
        component: category,
        meta: {
            title: '分类'
        }
    }, {
        path: '/cart',
        component: cart,
        meta: {
            title: '购物车'
        }
    }, {
        path: '/profile',
        component: profile,
        meta: {
            title: '我的'
        }
    }
    // , {
    //   path: '/detail',
    //   component: detail,
    // }
    , {
        path: '/detail/:id',
        component: detail,
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched[0].meta.title) {
        document.title = to.matched[0].meta.title;
    } else {
        document.title = "加载中..."
    }
    next();

})

export default router