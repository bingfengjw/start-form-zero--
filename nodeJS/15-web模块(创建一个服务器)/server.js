var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;

http.createServer(function(request,response){
	var pathname = request.url;
	if(pathname == '/favicon.ico'){
		return false;
	}
	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html;charset=UTF8'});
			response.write('页面失踪了!');
		}else{
			response.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			response.write(data.toString());
		};
		response.end();
	})
}).listen(port);
console.log('服务器已经架设在端口' + port + '上');