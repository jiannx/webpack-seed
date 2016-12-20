import app from 'app.config';
import './error.scss';

// 首页
app.config(($stateProvider) => {
    $stateProvider.state('404', {
        url: '/404',
        template: require('./404.html')
    });
});
