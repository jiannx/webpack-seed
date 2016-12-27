import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './modules/home';
import './components/header/header';
import './components/footer/footer';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
];

routes.push(home);

const router = new VueRouter({
    routes
});

router.afterEach((to, from, next) => {});

new Vue({
    router,
    data: {
        message: 'Hello Vue!'
    }
}).$mount('#app');
