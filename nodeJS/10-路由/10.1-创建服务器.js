var http = require('http');
var url = require('url');
var port = 8080;
function start(route){
	function Create(request,response){
		response.writeHead(200,{'Content-Type':'text/html;charset=UTF8'})
		response.write('成功进入服务器');
		//request.url	<--		解析请求的服务器的地址
		var pathname = url.parse(request.url).pathname;
		console.log(pathname);
		
		route(pathname);
		
		response.end();
	}
	http.createServer(Create).listen(port);
	console.log('已经在端口' + port + '上创建服务器');
}
exports.start = start;

