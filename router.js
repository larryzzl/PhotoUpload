var log4js = require("log4js");
log4js.configure({
	appenders: [
	{type: 'console'},
	{type: 'file', filename: 'logs/main.log', category: 'main'}
	]
});
var logger = log4js.getLogger('main');


function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);

	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	}
	else {
		logger.trace("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"})
		response.write("404 Not Found");
		response.end();
	}
}

exports.route = route;