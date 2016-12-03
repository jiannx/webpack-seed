var fs = require('fs');
var rimraf = require('rimraf');

rimraf('.tmp/dll', fs, function cb() {
    console.log('dll目录已清空');
});
