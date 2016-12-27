import Vue from 'vue';
import html from './header.html';

const Header = {
    template: html,
    data: function() {
        return {
            hello: 'hello word'
        };
    }
};

Vue.component('ne-header', Header);
