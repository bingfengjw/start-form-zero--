//buffer为创建一个缓冲区,用来存放二进制数据
//buffer内部只能放入字符串,每个中文汉字为3字节,字母标点阿拉伯数字均为1字节

var buf = new Buffer(256);
var len1 = buf.write('这是一段新的字符串,储存在缓冲区(buffer)');
var len2 = buf.write('a');
console.log('写入的字节数:' + len2);
