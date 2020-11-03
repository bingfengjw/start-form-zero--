var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function(request,response){
	//定义变量post,用来储存post的请求内容
	var post = '';
	request.on('data',function(chunk){
		//通过request的data事件监听请求内容,每次接收到请求体的数据都会被储存在变量port里面
		post += chunk;
	});
	request.on('end',function(){
		//在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
		post = querystring.parse(post);
		response.end(util.inspect(post));
	})
}).listen(8080);
console.log('服务器在8080端口上运行');
