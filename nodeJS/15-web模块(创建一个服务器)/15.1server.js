var http = require('http');
var url = require('url');
var fs = require('fs');
var port = 8080;

http.createServer(function(request,response){
	//解析客户端发送过来的请求路径
	var pathname = url.parse(request.url).pathname;
	//输出请求路径
	console.log('客户端的请求路径为: ' + request.url);
	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			console.log(err);
			//如果网页出现问题发送状态码404:not found
			response.writeHead(404,{'Content-Type':'text/html;charset=UTF8'});
			response.write('网页出现问题或者路径不存在');
		}else{
			//如果没有出现问题则页面访问成功,状态码200
			response.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			//相应文件内容
			response.write(data.toString());
		};
		//数据响应完毕,发送响应数据
		response.end();
	})
}).listen(port);

console.log('服务器成功创建,端口号为: ' + port);