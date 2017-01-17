import Vue from 'vue';
import layer from 'layer';
import { request } from 'app.components';
import html from './header.html';

console.log(request);
request('foundIndex').success();

function login() {
    let data = {
        show: 'account', // 'code' 'success' 'fail'
        login: {
            account: '222',
            password: '333'
        }
    };
    layer.open({
        title: false,
        type: 1,
        area: ['480px', '280px'],
        content: require('./login.html'),
        success: function(layero, index) {
            new Vue({
                el: '#' + layero.attr('id'),
                data: data,
                methods: {
                    onClose: function() {
                        layer.close(index);
                    },
                    onChangeShow: function(key) {
                        data.show = key;
                    },
                    onLogin: function() {
                        console.log(data);
                    }
                }
            });
        }
    });
}
login();

const Header = {
    template: html,
    props: ['sel'],
    data: function() {
        return {
            hello: 'hello word'
        };
    },
    methods: {
        onLogin: login,
        loginOut: function() {
            console.log('login out');
        }
    }
};

Vue.component('ne-header', Header);
