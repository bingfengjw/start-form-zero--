var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
//这里用来解析post提交的内容
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

app.get('/',function(req,res){
	readHtml(req,res,'public/index.html');
});

app.post('/submit',urlencodedParser,function(req,res){
	var response = {
		name:req.body.name,
		password:req.body.password
	}
	console.log(response);
	res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
	res.end(JSON.stringify(response));
})

app.listen(8080);


function readHtml(req,res,data){
	fs.readFile(data,function(err,data){
		if(err){
			console.log(err);
		}else{
			res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			res.write(data.toString());
			res.end();
		}
	})
}
