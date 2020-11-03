var events = require('events');
var EventEmitter = new events.EventEmitter();
EventEmitter.on('thing',function(a,b){
	console.log('第一个监听器' + a+b);
});

EventEmitter.on('thing',function(a,b){
	console.log('第二个监听器' + a+b);
});
EventEmitter.emit('thing','第一个参数','第二个参数');
console.log('程序执行完毕');