var http = require('http');
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var url = require("url");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

http.createServer(function (request, response) {
    
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
    router.route(handle, pathname, response, request);
    
}).listen(process.env.PORT || 8080);