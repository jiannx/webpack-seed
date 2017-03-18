import angular from 'angular';
import Table from './table.js';
import app from 'app.config';

class NeTable {
  constructor($rootScope, $compile, $controller) {
    this.$rootScope = $rootScope;
    this.$compile = $compile;
    this.$controller = $controller;
  }
  create(opts) {
    return new Table(opts, this.$rootScope, this.$compile, this.$controller);
  }
}

NeTable.$injector = ['$rootScope', '$compile', '$controller'];

app.service('neTable', NeTable);
