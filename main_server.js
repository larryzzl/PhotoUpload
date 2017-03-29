var http = require("http");
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

function start(route, handle) {
	function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname;
		logger.trace("Request for " + pathname + " received.");

		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8080);
	logger.trace("Server has started");
}

exports.start = start;