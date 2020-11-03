var fs = require('fs');
var data = '这是我要写入的内容';
var oUrl = '文本/这是一段文本内容.txt';
//创建写入流
var writeStream = fs.createWriteStream(oUrl);
//将UTF-8编码写入数据
writeStream.write(data,'UTF8');
//标记文件结尾
writeStream.end();
//处理流事件	-->	data,end,error
writeStream.on('finish',function(){
	console.log('文件写入完毕');
});
writeStream.on('error',function(err){
	console.log(err.stack);
});
console.log('程序执行完毕');
//写入流写入的内容会替换原本的内容