import app from 'app.config';
import chinaJson from './china.js';
import './style.scss';

/*
<div class="form-group form-group-line">
  <city-sel ng-model="citySel"></city-sel>
</div>
*/

app.directive('citySel', function() {
  return {
    require: '^ngModel',
    restrict: 'AE',
    scope: {},
    template: require('./tpls.html'),
    link: function(scope, element, attrs, ngModel) {
      scope.provinceData = chinaJson;
      scope.cityData = [];
      scope.areaData = [];
      scope.provinceSel = '';
      scope.citySel = '';
      scope.areaSel = '';
      scope.sel = ngModel.$viewValue;
      setTimeout(function() {
        scope.sel = ngModel.$viewValue;
      });
      scope.onChange = function(type) {
        // type: 'province', city, area
        if (type === 'province') {
          if (scope.provinceSel && scope.provinceSel !== '') {
            scope.cityData = scope.provinceSel.city;
          }
          scope.areaData = [];
          scope.citySel = '';
          scope.areaSel = '';
        }
        if (type === 'city') {
          scope.areaData = scope.citySel.area;
          scope.areaSel = '';
        }
        if (type === 'area' && scope.areaSel && scope.areaSel !== '') {
          scope.sel = [scope.provinceSel.name, scope.citySel.name, scope.areaSel];
          ngModel.$setViewValue(scope.sel);
          $('body').click();
        }
      };
      scope.stopPopo = function(e) {
        e.stopPropagation();
      };
    }
  };
});
