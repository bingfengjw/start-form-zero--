var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

app.get('/',function(req,res){
	readHtml(req,res,'public/index.html');
})
app.get('/abc',function(req,res){
	readHtml(req,res,'public/web2.html');
})
app.post('/submit',function(req,res){
	console.log(req.query);
	console.log('------------------------');
	readHtml(req,res,'public/submit.html');
})
app.get('*',function(req,res){
	readHtml(req,res,'public/404.html');
})


app.use(express.static('public'));
var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('host = ' + host);
	console.log('port = ' + port);
})


function readHtml(req,res,url){
	fs.readFile(url,function(err,data){
		if(err){
			res.writeHead(404,{'Content-Type':'text/html;charset=UTF8'});
			console.log(err);
			res.write(err);
			res.end();
		}else{
			res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			res.write(data.toString());
			res.end();
		}
	})
}
