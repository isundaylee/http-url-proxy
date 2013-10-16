var http = require('http');

http_handler = function(request, response) {
  var url = require('url');
  var params = url.parse(request.url, true).query;

  var target = url.parse(params.url);
  var proxy_request = http.request(target, function(proxy_response) {
    console.log('Request ' + params.url + ' started. ');
    proxy_response.on('data', function(chunk) {
      console.log('Request data written. ');
      response.write(chunk, 'binary');
    });
    proxy_response.on('end', function() {
      console.log('Request ended. ');
      response.end();
    })
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  })

  proxy_request.end(); 
}

http.createServer(http_handler).listen(8080);