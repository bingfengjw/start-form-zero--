var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',function(res,req){
	console.log('第一个:' + res.url);
	readHtml(res,req,'public/index.html')
});
app.get('/abc',function(res,req){
	console.log('第二个:' + res.url);
	readHtml(res,req,'public/web2.html')
});
app.get('*',function(res,req){
	console.log('第三个:' + res.url);
	readHtml(res,req,'public/404.html')
});

var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('host = ' + host);
	console.log('port = ' + port);
})

function readHtml(req,res,data){
	fs.readFile(data,function(err,data){
		if(err){
			res.writeHead(404,{'Content-Type':'text/html;charset=UTF8'});
			res.end();
		}else{
			res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			res.write(data.toString());
			res.end();
		}
	})
}
