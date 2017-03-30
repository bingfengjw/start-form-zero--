var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('Hello World!');
})

var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	//host为网页的路径(一直显示不出来,暂时不知道为什么)
	//port为网页的端口号
	
	console.log('访问地址为 http://%s:%s',host,port);
})
