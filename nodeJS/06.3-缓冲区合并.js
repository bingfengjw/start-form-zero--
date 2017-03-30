var buf1 = new Buffer('这是第一段缓冲区 ');
var buf2 = new Buffer('这是第二段缓冲区');
var buf3 = Buffer.concat([buf1,buf2]);
console.log('buf3的内容为:' + buf3.toString());
