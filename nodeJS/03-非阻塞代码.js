//创建fs文件读取服务
var fs = require('fs');
//创建文件路径
var data = '文本/阻塞代码与非阻塞代码的区别.txt';
//读取文件
fs.readFile(data,function(err,data){
	if(err){
		console.log(err);
		return false;
	};
	console.log(data.toString());
})
//运行结束
console.log('运行结束');
