import app from 'app.config';

export default class AppCtrl {
    constructor() {
        this.name = '';
    }
}
AppCtrl.$inject = [];

app.controller('appCtrl', AppCtrl);
