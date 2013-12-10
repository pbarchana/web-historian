var path = require('path');
var helpers = require('./http-helpers.js');
var url = require('url');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  var path = url.parse(req.url).pathname;
  if (path === '/') {
    helpers.serveGETMethod(res);
  } else {
    helpers.serveStaticAssets(res, exports.datadir, path);
  }
};