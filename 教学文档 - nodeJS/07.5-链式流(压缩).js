//链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
var fs = require('fs');
var data = '文本/output.txt';
var zlib = require('zlib');
fs.createReadStream(data)
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('文本/input.zip'));
console.log('程序执行完毕');
