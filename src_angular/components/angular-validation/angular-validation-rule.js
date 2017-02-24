(function() {
    angular
        .module('validation.rule', ['validation'])
        .config(['$validationProvider', function($validationProvider) {
            var expression = {
                required: function(value) {
                    return !!value;
                },
                url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                number: /^\d+$/,
                minlength: function(value, scope, element, attrs, param) {
                    return value && value.length >= param;
                },
                maxlength: function(value, scope, element, attrs, param) {
                    return !value || value.length <= param;
                }
            };

            var defaultMsg = {
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
                minlength: {
                    error: '长度过短',
                    success: 'Long enough!'
                },
                maxlength: {
                    error: '长度过长',
                    success: 'Short enough!'
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
}).call(this);

// input上必须添加name属性
