import Vue from 'vue';
import html from './header.html';

const Header = {
    template: html,
    props: ['sel'],
    data: function() {
        return {
            hello: 'hello word'
        };
    },
    methods: {
        loginOut: function() {
            console.log('login out');
        }
    }
};

Vue.component('ne-header', Header);
