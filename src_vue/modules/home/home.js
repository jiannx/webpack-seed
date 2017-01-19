import { request } from 'app.components';
import html from './home.html';

let homeData = {
    name: 'home',
    course: new Array(8),
    active: new Array(4),
    banners: []
};

function init() {
    request('foundIndex', {
        page: 1,
        typesid: 1,
        course_cate_id: 2,
        grade: '1',
        facility: '难',
        course_times: '',
        course_area: ''
    }).success(() => {

    });
    request('indexBanner').success((res) => {
        // homeData.banners = res.rsm.banner_list; // [{titlepic, weburl}]
        homeData.banners = [
            { titlepic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484836659815&di=5d05a6abd36ae806062a2e8565cbb74f&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fnature%2Fda_ps_landscape_01%2Fwallpapers%2F1680x1050%2F%255Bwallcoo_com%255D_april_wallpaper.jpg' },
            { titlepic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484836659815&di=de772551083e0c52032cca2c3ab372d0&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F14%2F8af417550a0b47d94f6977072f35df27.jpg' },
            { titlepic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484836659815&di=fbeb88dc45d20cbae662f32cfd74dbf6&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201701%2F14%2F552548be1141c5fb907972d46e87ada6.jpg' }
        ];
        $('#theTarget').append(`<div class="img" style="background-image: url(${homeData.banners[0].titlepic})"></div>`);
        $('#theTarget').append(`<div class="img" style="background-image: url(${homeData.banners[1].titlepic})"></div>`);
        $('#theTarget').append(`<div class="img" style="background-image: url(${homeData.banners[2].titlepic})"></div>`);
        setTimeout(function() {
            $('#theTarget').skippr({
                transition: 'fade',
                speed: 1000,
                easing: 'easeOutQuart',
                navType: 'bubble',
                childrenElementType: 'div',
                arrows: false,
                autoPlay: true,
                autoPlayDuration: 4000,
                keyboardOnAlways: true,
                hidePrevious: false
            }, 200);
        });
    });
}


const page = {
    template: html,
    created: function() {},
    data: function() {
        init();
        return homeData;
    }
};

export default [{
    path: '/home',
    component: page
}];
