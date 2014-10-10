var http = require("http");
var url = require("url");

http.createServer(function(request, response){
	console.dir(url.parse(request.url));
	var pathname = url.parse(request.url).pathname;
	var callback = url.parse(request.url).callback || 'callback';
	var success = false;
	var data = null;
	console.log(pathname);
	if(pathname){
		data = require("../data" + pathname + ".json");		
	}
	if(data){
		console.dir(data);
		console.log("Request for data " + pathname + ".json");
		response.writeHead(200, {"Content-Type" : "text/plain"});
		var str = callback + "(" + JSON.stringify(data) + ");"
		response.write(str);
	}
	else{
		console.log("Request is error!");
		response.writeHead(404, {"Content-Type" : "text/plain"});		
		response.write("Hello World! Error!");
	}
	response.end();
}).listen(9000);
