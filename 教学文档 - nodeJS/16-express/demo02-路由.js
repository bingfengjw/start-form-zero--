var express = require('express');
var app = express();
var fs = require('fs');
//在主页输出内容
app.get('/',function(req,res){
	console.log('这是来自主页的get请求');
	console.log(req.url);
	readHtml(req,res,'public/index.html');
	//res.send('hello world');
});
app.get('/abc',function(req,res){
	console.log('这是来自abc的get请求');
	readHtml(req,res,'public/web2.html');
});
app.get('/user_list',function(req,res){
	console.log('这是来自user_list的get请求');
	res.send('user_list');
});
app.get('/*',function(req,res){
	console.log('req.url = ' + req.url);
	console.log('res.url = ' + res.url);
	readHtml(req,res,'public/404.html');
});
var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('server = ' + server);
	console.log('server.address() = ' + server.address());
	console.log('host = ' + host);
	console.log('port = ' + port);
	console.log("应用实例，访问地址为 http://%s:%s",host,port);
});

function readHtml(req,res,url){
	fs.readFile(url,function(err,data){
		if(err){
			console.log(err);
			res.writeHead(404,{'Content-Type':'text/html;charset=UTF8'});
			res.send('页面出现错误,请重新链接');
		}else{
			res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			res.write(data.toString());
		};
		res.end();
	})
}
