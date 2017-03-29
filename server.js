var http = require('http');
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var url = require("url");

// setup Log4JS
var log4js = require("log4js");
log4js.configure({
	appenders: [
	{type: 'console'},
	{type: 'file', filename: 'logs/main.log', category: 'main'}
	]
});
var logger = log4js.getLogger('main');

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

http.createServer(function (request, response) {
    
	var pathname = url.parse(request.url).pathname;
	logger.trace("Request for " + pathname + " received.");
    router.route(handle, pathname, response, request);
    
}).listen(process.env.PORT || 8080);