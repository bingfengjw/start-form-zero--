//引入events模块
var events = require('events');
//创建EventEmitter对象
var EventEmitter = new events.EventEmitter();
//创建事件处理程序(不会触发事件)
var eventHandler = function(){
	console.log('连接成功!');
	//触发事件data_send事件
	EventEmitter.emit('connect_suc');
}
//绑定事件处理程序(不会触发事件)
EventEmitter.on('connect',eventHandler)
//绑定data_send事件(不会触发事件)
EventEmitter.on('connect_suc',function(){
	console.log('服务器成功接收到了返回来的数据');
})
//事件触发
EventEmitter.emit('connect');
console.log('程序执行完毕');

//总体流程:
//	1.先绑定需要的模块events,然后创建必须的EventEmitter对象
//	2.创建一个事件处理的程序,在之后触发事件时会将这个程序和需要触发的事件绑定在一起;同时在触发被处理的事件之后向服务器返回一个数据
//	3.将事件处理程序和事件绑定在一起,事件的名称可以自定义
//	4.制作一个事件,响应服务器返回回来的数据
//	5.触发事件(服务器向用户发送一个数据)
//	ps:  事件监听时on为用户发送给服务器端的数据,emit为服务器向用户发送的数据