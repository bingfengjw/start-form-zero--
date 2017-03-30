var http = require('http');
var events = require('events');
var EventEmitter = new events.EventEmitter();
var count = 0;

//每次有用户访问服务器都会console
EventEmitter.on('count',function(){
	count++;
	console.log(count);
})

http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
	response.end('连接服务器成功');
	if(request.url != '/favicon.ico'){
		EventEmitter.emit('count');
	};
}).listen(8080);


console.log('服务器正运行在端口8080上');
