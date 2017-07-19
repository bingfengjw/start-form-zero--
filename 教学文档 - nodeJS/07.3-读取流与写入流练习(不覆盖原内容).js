var fs = require('fs');
var data = '';
var oUrl = '文本/这是一段文本内容.txt';
var readStream = fs.createReadStream(oUrl);
readStream.setEncoding('UTF8');
readStream.on('data',function(chunk){
	data += chunk;
});
readStream.on('end',function(){
	var writeStream = fs.createWriteStream(oUrl);
	writeStream.write(data + '<br/>这是我要添加的内容','UTF8');
	writeStream.on('finish',function(){
		console.log('文件写入完毕');
	});
	writeStream.end();
	writeStream.on('error',function(err){
		console.log(err.stack);
	});
});
readStream.on('error',function(err){
	console.log(err.stack);
})
console.log('程序执行完毕');
