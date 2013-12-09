var path = require('path');
var helpers = require('./http-helpers.js');
var url = require('url');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  var path = url.parse(req.url).pathname;
  console.log(exports.datadir);
  helpers.serveStaticAssets(res, exports.datadir, path);
  // res.writeHead(200, helpers.headers);
  // res.end('<input></input>');
};
