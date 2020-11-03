var fs = require('fs');
var data = '';
//创建可读事件流
var readStream = fs.createReadStream('文本/这是一段文本内容.txt');
//设置文件读取编码
readStream.setEncoding('UTF8');
//处理事件流
	//处理成功:
readStream.on('data',function(chunk){
	data += chunk;
});
	//事件处理结束:
readStream.on('end',function(){
	console.log(data);
});
	//事件处理异常
readStream.on('error',function(err){
	console.log(err.stack);
});
console.log('事件处理完毕');
