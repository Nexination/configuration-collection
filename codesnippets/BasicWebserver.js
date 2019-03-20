'use strict';
let http = require('http');
let route = {
  "books": {
    "book1": function book1() {console.log('book');}
  }
};

let handleRequest = function(request, response) {
  let body = '';
  request.on('data', function data(data) {
    body += data;
  });
  request.on('end', function end() {
    let path = request.url.split('/');
    let tempPath = route;
    for(let i = 0; i < path.length; i += 1) {
      tempPath = tempPath[path[i]];
    };
    tempPath();
    response.end(body);
  });

};
http.createServer(handleRequest).listen(8080);