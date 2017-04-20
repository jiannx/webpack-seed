import app from 'app.config';

/*
<div class="form-group form-group-line">
  <city-sel ng-model="citySel"></city-sel>
</div>
*/

app.directive('timeSel', function() {
  return {
    require: '^ngModel',
    restrict: 'AE',
    scope: {
      ngModel: '=',
      name: '@'
    },
    replace: true,
    template: require('./tpls.html'),
    link: function(scope, element, attrs, ngModel) {
      scope.hourList = [];
      scope.startTime = { h: '00', m: '00' };
      scope.endTime = { h: '00', m: '00' };
      for (let i = 0; i < 24; i += 1) {
        scope.hourList.push(i > 9 ? i.toString() : '0' + i);
      }
      scope.minList = [];
      for (let i = 0; i < 60; i += 1) {
        scope.minList.push(i > 9 ? i.toString() : '0' + i);
      }

      function init() {
        scope.sel = ngModel.$viewValue;
        if (!scope.sel) {
          scope.sel = ['23:01', '22:02'];
        }
        let s = /(.*):(.*)/.exec(scope.sel[0]);
        let e = /(.*):(.*)/.exec(scope.sel[1]);
        if (s) {
          scope.startTime.h = s[1];
          scope.startTime.m = s[2];
        }
        if (e) {
          scope.endTime.h = e[1];
          scope.endTime.m = e[2];
        }
      }

      setTimeout(function() {
        scope.sel = ngModel.$viewValue;
        init();
      });
      scope.$watch('ngModel', function() {
        init();
      });
      scope.onChange = function(type) {
        // $('body').click();
      };
      scope.onSubmit = function() {
        scope.sel = [scope.startTime.h + ':' + scope.startTime.m, scope.endTime.h + ':' + scope.endTime.m];
        ngModel.$setViewValue(scope.sel);
        console.log(ngModel.$viewValue);
      };
      scope.stopPopo = function(e) {
        e.stopPropagation();
      };
    }
  };
});
