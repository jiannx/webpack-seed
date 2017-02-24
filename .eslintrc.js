module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    // "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "globals": {
        "window": true,
        "document": true
    },
    "rules": {
        //http://eslint.org/docs/rules/
        "linebreak-style": 0, // unix 和 window端不同的换行
        "func-names": 0, // 函数声明方式
        "indent": 0, // tab键
        "space-before-function-paren": 0, // 函数名与参数间空格
        "no-unused-vars": 1, // 警告未使用变量
        "comma-dangle": 0, // 数组最后一项必须有逗号
        "prefer-const": 0, // 使用const
        "quote-props": 0, // 对象属性名称需要引号
        "no-unused-expressions": 1, // 无效表达式
        "no-useless-escape": 0, // 多余符号
        "class-methods-use-this": 1, // 对象static方法 
        "import/no-extraneous-dependencies": 0,
        "import/no-unresolved": 0,
        "react/sort-comp": 0,
        "react/prop-types": 0,
        "react/prefer-stateless-function": 0,
        "import/extensions": 0,
        "no-restricted-syntax": 0,

        "no-console": 0,
        "no-underscore-dangle": 0,
        "prefer-template": 0,
        "object-shorthand": 0,
        "prefer-arrow-callback": 0,
        "prefer-rest-params": 0,
        "no-param-reassign": 0,
        "global-require": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
};
