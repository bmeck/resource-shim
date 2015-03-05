var Module = require('module').Module;
var bootstrap = require('./');
var _wrap = Module.wrap;
Module.wrap = function () {
  var src = '(function (exports, require, module, __filename, __dirname) {' +
    'if (!require.listResources){(' + bootstrap + ')(require)}' +
    'return ' + _wrap.apply(this, arguments).replace(/\s*;\s*$/g, '') + '.apply(this, arguments)' +
  '});';
  return src;
}
return bootstrap;
