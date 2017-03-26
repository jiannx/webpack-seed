import app from 'app.config';
import chinaJson from './china.js';
import './style.scss';

/*
<div class="form-group form-group-line">
  <city-sel ng-model="citySel"></city-sel>
</div>
*/

const provinceCity = ['北京', '上海', '重庆', '天津', '香港', '澳门'];

function isInProvinceCity(province) {
  for (let item of provinceCity) {
    if (item === province) {
      return true;
    }
  }
  return false;
}

app.directive('citySel', function() {
  return {
    require: '^ngModel',
    restrict: 'AE',
    scope: {

    },
    replace: true,
    template: require('./tpls.html'),
    link: function(scope, element, attrs, ngModel) {
      if (attrs.type === 'grid') {
        scope.isGrid = true;
      }
      scope.provinceData = chinaJson;
      scope.cityData = [];
      scope.areaData = [];
      scope.provinceSel = '';
      scope.citySel = '';
      scope.areaSel = '';
      scope.sel = ngModel.$viewValue;
      scope.hasArea = true;
      setTimeout(function() {
        scope.sel = ngModel.$viewValue;
      });
      scope.onChange = function(type) {
        // type: 'province', city, area
        if (type === 'province') {
          if (scope.provinceSel && scope.provinceSel !== '') {
            if (isInProvinceCity(scope.provinceSel.name)) {
              let area = scope.provinceSel.city[0].area;
              scope.cityData = [];
              for (let item of area) {
                scope.cityData.push({ name: item });
              }
              scope.hasArea = false;
            } else {
              scope.hasArea = true;
              scope.cityData = scope.provinceSel.city;
            }
          }
          scope.areaData = [];
          scope.citySel = '';
          scope.areaSel = '';
        }
        if (type === 'city') {
          scope.areaData = scope.citySel.area;
          scope.areaSel = '';
          if (scope.hasArea === false) {
            scope.sel = [scope.provinceSel.name, scope.citySel.name, scope.areaSel];
            ngModel.$setViewValue(scope.sel);
            $('body').click();
          }
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
