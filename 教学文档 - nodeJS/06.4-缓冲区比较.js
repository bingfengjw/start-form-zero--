var buf1 = new Buffer('这是一段缓冲区');
var buf2 = new Buffer('这是二端缓冲区');
console.log(buf1.compare(buf2));
//buf1比buf2多内容或者内容不同时显示-1,没有则显示0,buf2比buf1多则显示1