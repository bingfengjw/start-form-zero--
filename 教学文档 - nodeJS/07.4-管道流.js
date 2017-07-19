var fs = require('fs');
//创建读取流
var readStream = fs.createReadStream('文本/这是一段文本内容.txt');
//创建写入流
var writeStream = fs.createWriteStream('文本/output.txt');
//创建管道流(复制读取到的内容到写入流里面)
readStream.pipe(writeStream);
console.log('程序执行完毕');