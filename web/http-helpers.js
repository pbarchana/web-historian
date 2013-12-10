var path = require('path');
var fs = require('fs');
var sitesDir = path.join(__dirname, "../data/sites/");
// var datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.



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

exports.throw404 = throw404 = function(res) {
  res.writeHead(404, headers);
  res.end();
}

exports.saveToSites = function(req, res, datadir) {
  var site = '';
  debugger;
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    site += chunk;
  });
  req.on('end', function() {
    console.log("before JSON : ", site);
    site = site.split('=')[1];
    console.log('DEBUG: after json', site);

    fs.appendFile(datadir, site + '\n', function(err) {
      if (err) throw err;
      console.log("Written to sites.txt");
      res.writeHead(302, headers);
      res.end();
    });
  });
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
      } else {
        throw404(res);
      }
    });
  }
};

// As you go through, keep thinking about what helper functions you can put here!