var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
	response.end(util.inspect(url.parse(request.url,true)));
}).listen(8080);

//http://localhost:8080/user?name=w3c&email=w3c@w3cschool.cc
//util.inspect(url.parse(request.url,true))会自动解析访问请求