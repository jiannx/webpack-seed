import discoverHtml from './discover.html';
import detailHtml from './course-detial.html';

const page = {
    template: discoverHtml,
    created: function() {},
    data: function() {
        return {
            name: 'discover',
            course: new Array(5)
        };
    }
};
const detail = {
    template: detailHtml,
    created: function() {},
    data: function() {
        return {
            name: 'discover',
            course: new Array(5)
        };
    }
};

export default [{
    path: '/discover',
    component: page
}, {
    path: '/discover/detail',
    component: detail
}];
