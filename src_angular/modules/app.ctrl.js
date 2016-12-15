import app from 'app.config';

export default class AppCtrl {
    constructor($http, appService) {
        appService.cfg.isInit = true;
    }
}
AppCtrl.$inject = ['$http', 'appService'];

app.controller('appCtrl', AppCtrl);
