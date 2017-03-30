var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

var user = {
	'user4':{
		'name':'张三',
		'password':'password4',
		'profession':'transformer',
		'id':4
	}
}

app.get('/userList',function(req,res){
	fs.readFile(__dirname + '/users.json','utf8',function(err,data){
		if(err){
			console.log(err);
			return false;
		}else{
			data = JSON.parse(data);
			data['user4'] = user['user4'];
			console.log(data);
			res.end(JSON.stringify(data));
		}
	})
})

var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('服务器创建成功');
})
