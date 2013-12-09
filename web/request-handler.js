var path = require('path');
var helpers = require('./http-helpers.js');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  console.log(exports.datadir);
  res.writeHead(200, helpers.headers);
  res.end('<input></input>');
};
