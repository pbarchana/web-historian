var path = require('path');
var fs = require('fs');
var sitesDir = path.join(__dirname, "../data/sites/");


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveGETMethod  =  function(res){
  res.writeHead(200, headers);
  res.end('<input></input>');
}

exports.serveStaticAssets = function(res, folder, asset) {
  fs.readFile(folder, 'utf8', function(err, data) {
    if (err) throw err;
    var sites = data.split('\n');
    searchForSite(sites);
  });

  var searchForSite = function(sites) {
    sites.forEach(function(site) {
      if (site === asset.slice(1)) {
        fs.readFile(sitesDir + site, 'utf8', function(err, data) {
          if (err) throw err;
          res.writeHead(200, headers);
          res.end(data);
        });
      }
    });
  }


  // var file = '';
  // debugger;
  // var data = fs.readFileSync(folder, 'utf8');
  // file = JSON.parse(data);
  // // for (var l in data) {
  // //   var line = data[l];
  // //   file += line;
  // // }

  // // fs.open(folder, 'r', function(err, fd) {
  // //   if (err) throw err;
  // //   file = fd;
  // // });


};

// As you go through, keep thinking about what helper functions you can put here!