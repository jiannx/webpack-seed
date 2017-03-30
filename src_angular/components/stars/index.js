import app from 'app.config';

const STAR_MAX = 5;

app.directive('stars', function() {
  return {
    restrict: 'AE',
    scope: {
      stars: '='
    },
    replace: true,
    template: require('./tpls.html'),
    link: function(scope, element, attrs) {
      scope.list = [];

      function convert(val) {
        scope.list = [];
        if (isNaN(val)) {
          console.warn('stars: 无效参数');
          return;
        }
        let z = parseInt(val, 10);
        let y = val - z;
        for (let i = 1; i <= STAR_MAX; i += 1) {
          if (i <= z) {
            scope.list.push(1);
          } else if (i === z + 1) {
            scope.list.push(y);
          } else {
            scope.list.push(0);
          }
        }
      }
      scope.$watch('stars', function(val) {
        convert(parseFloat(val));
      });
      // attrs.$observe('num', function(val) {
      //   console.log(val);
      // });
    }
  };
});
