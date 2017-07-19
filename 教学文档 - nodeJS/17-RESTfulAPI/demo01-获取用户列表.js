var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

app.get('/userList',function(req,res){
	fs.readFile(__dirname + '/users.json','UTF8',function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
			res.end(data);
		};
	});
});

var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('host = ' + host);
	console.log('port = ' + port);
	
})
