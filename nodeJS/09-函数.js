//由于nodeJS函数和原生JavaScript用法基本相同,所以不做过多练习
var http = require('http');
var server = 8080;
function httpServer(request,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
	response.end('hello world!');
};
http.createServer(httpServer).listen(server);
console.log('已经在接口' + server + '上创建服务器');