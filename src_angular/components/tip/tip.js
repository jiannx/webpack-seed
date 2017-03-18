import angular from 'angular';
import app from 'app.config';

app.directive('tip', function() {
  function show(obj, attrs) {
    let place = attrs.tipPlace || 'top';
    let $parent = obj.parent();
    let $tip = angular.element(`<div class="ne-tip slide-in-up-small">${attrs.tip}</div>`);
    let SPACE_SIZE = 10;
    $parent.append($tip);
    let size = { width: obj[0].offsetWidth, height: obj[0].offsetHeight };

    $tip.css({
      'width': $tip[0].offsetWidth + 'px',
      'height': $tip[0].offsetHeight + 'px'
    });
    if (place === 'top') {
      $tip.addClass('top');
      $tip.css({
        'left': '0px',
        'top': -($tip[0].offsetHeight + SPACE_SIZE) + 'px'
      });
    } else if (place === 'right') {
      $tip.addClass('right');
      $tip.css({
        'left': size.width + SPACE_SIZE + 'px',
        'top': '0px'
      });
    } else if (place === 'bottom') {
      $tip.addClass('bottom');
      $tip.css({
        'left': '0px',
        'top': size.height + SPACE_SIZE + 'px'
      });
    }
  }
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      elm.focus(function() {
        show(elm, attrs);
      });
      elm.blur(function() {
        elm.parent().find('.ne-tip').remove();
      });
    }
  };
});
