var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var hostname = '127.0.0.1';
var port = 8080;

var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var extname = path.extname(pathname);

    var contenttype = 'text/html';

    switch (extname) {
        case '.html':
            contenttype = 'text/html';
            break;
        case '.js':
            contenttype = 'text/js';
            break;
        case '.css':
            contenttype = 'text/css';
            break;
        case '.png':
            contenttype = 'image/png';
            break;
        case '.ttf':
            contenttype = 'application/octet-stream';
            break;
    }

    if (pathname == '/') {
        pathname = '/index.html';
    }

    pathname = '.' + pathname;

    pathname = path.resolve(pathname);

    fs.exists(pathname, function(exists) {
        if (exists) {
            fs.readFile(pathname, function(err, data) {
                res.writeHead(200, {'Content-Type': contenttype});
                res.write(data);
                res.end();
            });
        } else {
            res.writeHead(404)
            res.end();
        }
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
