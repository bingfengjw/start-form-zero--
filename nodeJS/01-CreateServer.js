	//创建http模块
var http = require('http');
//创建服务器,并监听1000端口
http.createServer(function(request,response){
//request	-->		服务器发送的信息
//response	-->		服务器返回的信息
	//服务器相应的数据	↓↓↓
	//打印网页头部内容
	response.writeHead(200,{'Content-Type':'text/plain'});
	//服务器返回信息
	response.end('Hello world!');
}).listen(8080);
//服务器运行成功后响应的消息
console.log('服务器正运行在8080端口');