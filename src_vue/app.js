import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './modules/home/home';
import discover from './modules/discover/discover';
import create from './modules/create/create';
import download from './modules/download/download';
import user from './modules/user/user';
import './components/header/header';
import './components/footer/footer';

// 样式引入
import './scss/bootstrap.scss';
import './scss/app.scss';
import './scss/animate.css';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
];

routes.push(...home);
routes.push(...discover);
routes.push(...create);
routes.push(...download);
routes.push(...user);

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
