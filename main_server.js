var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname;
		//logger.trace("Request for " + pathname + " received.");

		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8080);
	//logger.trace("Server has started");
}

exports.start = start;