module.exports = function bootstrap(require) {
  if (require.listResource) return;
  var path = require('path');
  var fs = require('fs');
  var existsSync = function (file) {
    try {
      fs.statSync(file);
      return true;
    }
    catch (e) {
      return false;
    }
  }
  var exists= function (file, cb) {
    fs.stat(file, function (err) {
      if (err) cb(false);
      else cb(true);
    });
  }
  require.resourceExistsSync = function listResources(resourcePath) {
    return existsSync(path.resolve(path.dirname(__filename), resourcePath));
  }
  require.resourceExists = function readResource(resourcePath, opts, cb) {
    exists(path.resolve(path.dirname(__filename), resourcePath), cb);
  }
  require.listResources = function listResources(resourcePath) {
    return fs.readdirSync(path.resolve(path.dirname(__filename), resourcePath));
  }
  require.readResource = function readResource(resourcePath, opts, cb) {
    fs.readFile(path.resolve(path.dirname(__filename), resourcePath), opts, cb); 
  }
  require.readResourceSync = function readResource(resourcePath, opts) {
    return fs.readFileSync(path.resolve(path.dirname(__filename), resourcePath), opts); 
  }
  require.listResources = function listResources(resourcePath, cb) {
    fs.readdir(path.resolve(path.dirname(__filename), resourcePath), cb);
  }
  require.listResourcesSync = function listResources(resourcePath) {
    return fs.readdirSync(path.resolve(path.dirname(__filename), resourcePath));
  }
  require.createReadStream = function createResourceReadStream(resourcePath, opts, cb) {
    return fs.createReadStream(path.resolve(path.dirname(__filename), resourcePath), opts); 
}
}
