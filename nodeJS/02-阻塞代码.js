//创建fs服务
var fs = require('fs');
//创建文本路径并读取
var data = fs.readFileSync('文本/这是一段文本内容.txt');
//读取文本内容
console.log(data.toString());
//代码运行结束
console.log('运行结束');
