import app from 'app.config';

export default class AppCtrl {
    constructor($http, appService) {
        this.name = '23';
        appService.cfg.isInit = true;
    }
}
AppCtrl.$inject = ['$http', 'appService'];

app.controller('appCtrl', AppCtrl);
