var buf1 = new Buffer('123456');
var buf2 = new Buffer(6);	//此处的6为buf2缓冲区的长度,如果没有实质内容则会返回乱码
console.log('buf2复制之前的内容为: ' + buf2.toString());
buf1.copy(buf2);
console.log('buf2复制之后的内容为: ' + buf2);
