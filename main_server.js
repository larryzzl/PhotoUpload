var http = require("http");
var url = require("url");

var log4js = require("log4js");
log4js.configure({
	appenders: [
	{type: 'console'},
	{type: 'file', filename: 'public/main.log', category: 'main'}
	]
});
var logger = log4js.getLogger('main');

function start(route, handle) {
	function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started");
}

exports.start = start;