// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var path = require('path');
var htmlHelpers = require('./lib/html-fetcher-helpers.js');
var dataDir = path.join(__dirname, "../data/");

exports.fetchHTML = fetchHTML = function(){
  htmlHelpers.readUrls(dataDir + 'sites.txt', function(urls) {
    htmlHelpers.downloadUrls(urls);
  });
}

fetchHTML();

