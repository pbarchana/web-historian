var path = require('path');
var helpers = require('./http-helpers.js');
var url = require('url');
var htmlfetch = require('../workers/htmlfetcher.js');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  var path = url.parse(req.url).pathname;
  debugger;
  htmlfetch.fetchHTML();
  if (req.method === 'GET') {
    // if (path === '/') {
    //   helpers.serveGETMethod(res);
    // } else 
    debugger;
    if (path.indexOf('/sites/') === 0) {   //when not sites
      helpers.serveSite(path, res);
    } else {
      helpers.servePublicFiles(path, res);
    }
  }
  if (req.method === 'POST') {
    if (path === '/') {
      helpers.saveToSites(req, res, exports.datadir);
    } else {
      helpers.throw404(res);
    }
  }
};