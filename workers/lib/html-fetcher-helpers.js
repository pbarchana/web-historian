var http = require('http');
var fs = require('fs');
var path = require('path');
var sitesDir = path.join(__dirname, "../../data/sites/");

exports.readUrls = function(filePath, callback){
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) throw err;
    var urls = data.split('\n');
    callback(urls);
  });
};

exports.downloadUrls = function(urls){
  urls.forEach(function(url) {
    if (url) { // test for ""
      var file = fs.createWriteStream(sitesDir + url);
      var request = http.get("http://" + url, function(response) {
        response.pipe(file);
      });
    }
  });
  return true;
};
