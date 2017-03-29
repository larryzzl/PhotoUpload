var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

// setup Log4JS
var log4js = require("log4js");
log4js.configure({
	appenders: [
	{type: 'console'},
	{type: 'file', filename: 'logs/main.log', category: 'main'}
	]
});
var logger = log4js.getLogger('main');

function start(response) {
	logger.trace("Request handler 'Start' was called");

	 var body = '<html>'+
			    '<head>'+
			    '<meta http-equiv="Content-Type" '+
			    'content="text/html; charset=UTF-8" />'+
			    '</head>'+
			    '<body>'+
			    '<form action="/upload" enctype="multipart/form-data" '+
			    'method="post">'+
			    '<input type="file" name="upload">'+
			    '<input type="submit" value="Upload file" />'+
			    '</form>'+
			    '</body>'+
			    '</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
	logger.trace("Request handler 'Upload' was called");

	var form = new formidable.IncomingForm();
	logger.trace("about to parse");

	form.parse(request, function (error, fields, files) {
	logger.trace("parsing done");

		if (error) {
			logger.error("Parse error: " + error);
		}

		fs.renameSync(files.upload.path, "/tmp/test.png", function (error) {
			if (error) {
				logger.error("rename error: " + error);
			}
		});
		logger.trace("rename file done");

		response.writeHead(200, {"Content-Type": "text/html"})
		response.write("Received Image: <br/>");
		response.write("<img src='/show' />");
		response.end();
	});

	
}

function show(response) {
	logger.trace("Request handler 'show' was called.");

	fs.readFile("/tmp/test.png", "binary", function (error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"})
			response.write(error + "\n");
			response.end();
		}
		else {
			response.writeHead(200, {"Content-Type": "image/png"})
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;