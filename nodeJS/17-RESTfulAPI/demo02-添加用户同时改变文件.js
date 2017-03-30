var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var File = __dirname + '/users.json';

var user = {
	'user4':{
		'name':'张三',
		'password':'password4',
		'profession':'transformer',
		'id':4
	}
}

app.get('/userList',function(req,res){
	fs.readFile(File,'utf8',function(err,data){
		if(err){
			console.log(err);
			return false;
		}else{
			console.log('最开始的文件内容为 : ' + data);
			data = JSON.parse(data);
			data['user4'] = user['user4'];
			console.log('写入之前的文件内容为 : ' + data);
			//res.end(JSON.stringify(data));
			fs.writeFile(File,JSON.stringify(data),function(err,data){
				if(err){
					console.log(err);
				}else{
					fs.readFile(File,'utf8',function(err,data){
						if(err){
							console.log(err)
						}else{
							res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
							res.write(data.toString());
							console.log('文件写入之后的内容为 : ' + data);
						}
					})
				}
			})
		}
	})
})

var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('服务器创建成功');
})
