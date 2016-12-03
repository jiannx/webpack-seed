var fs = require('fs');
var rimraf = require('rimraf');

rimraf('build', fs, function cb() {
    console.log('build目录已清空');
});
