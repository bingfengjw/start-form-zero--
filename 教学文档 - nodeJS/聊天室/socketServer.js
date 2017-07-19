//引入依赖模块
var http = require("http");

//引入express模块
var express = require("express");

//创建一个express程序
var app = express();
var port = 8088;        //服务器端口号
//创建web服务器
//var httpServer = http.createServer(app);

//被备注的部分为正确的代码,和下面httpserver部分的代码效果一样
var httpServer = app.listen(port,function(){
	var host = httpServer.address().address;
	var port = httpServer.address().port;
	console.log('host = ' + host);
	console.log('port = ' + port);
})

//引入自定义的服务器模块,并调用器listen方法
var socketServer = require("./server.js");
socketServer.listen(httpServer);

//指定静态资源处理中间件
app.use(express.static("public"));

//创建服务器
//httpServer.listen(port,function(){
//  console.log("正在监听服务器,端口号为" + port);
//});


