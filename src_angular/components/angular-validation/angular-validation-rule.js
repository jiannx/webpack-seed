import angular from 'angular';

angular.module('validation.rule', ['validation']).config(['$validationProvider', function($validationProvider) {
  let expression = {
    required: function(value) {
      return !!value;
    },
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    number: /^\d+$/,
    ip: /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/,
    minlength: function(value, scope, element, attrs, param) {
      return value && value.length >= param;
    },
    maxlength: function(value, scope, element, attrs, param) {
      return !value || value.length <= param;
    },
    domain: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
    noNegativeInt: /^\d+$/, // 非负整数
  };

  let defaultMsg = {
    required: {
      error: '必填项',
      success: 'It\'s Required'
    },
    url: {
      error: '请填写正确的url',
      success: 'It\'s Url'
    },
    email: {
      error: '请填写正确的Email',
      success: 'It\'s Email'
    },
    number: {
      error: '请填写正确的数字',
      success: 'It\'s Number'
    },
    ip: {
      error: '请填写正确的ip',
      success: 'It\'s ip'
    },
    minlength: {
      error: '长度过短',
      success: 'Long enough!'
    },
    maxlength: {
      error: '长度过长',
      success: 'Short enough!'
    },
    domain: {
      error: '请填写正确的域名',
      success: 'Its domian'
    },
    noNegativeInt: {
      error: '请填写正整数',
      success: 'Its true'
    }
  };
  $validationProvider.showSuccessMessage = false;
  $validationProvider.setErrorHTML(function(msg, element, attrs) {
    return '<span class="text-danger">' + msg + '</span>';
  });
  $validationProvider.validCallback = function(element) {
    element.removeClass('has-error').addClass('has-success');
  };
  $validationProvider.invalidCallback = function(element) {
    element.removeClass('has-success').addClass('has-error');
  };
  $validationProvider.resetCallback = function(element) {
    element.removeClass('has-success').removeClass('has-error');
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
// input上必须添加name属性
