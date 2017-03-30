var events = require('events');
var EventEmitter = new events.EventEmitter();
EventEmitter.on('send',function(){
	console.log('服务器发送信息');
});
setInterval(function(){
	EventEmitter.emit('send');
},1000);
console.log('程序执行完毕');