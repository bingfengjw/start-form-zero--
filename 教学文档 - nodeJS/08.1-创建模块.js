//Node.js 提供了exports 和 require 两个对象，
//其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

function hello(){
	var name;
	this.setName = function(a){
		name = a;
	};
	this.sayHello = function(){
		console.log(name + '你好!');
	}
};
module.exports = hello;