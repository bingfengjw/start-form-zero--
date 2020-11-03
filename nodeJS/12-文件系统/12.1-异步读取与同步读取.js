var fs = require('fs');
var data = '../文本/input.txt'
var content = fs.readFileSync(data);
console.log(content.toString());
console.log('文件的同步读取完成');
console.log('------------------');

fs.readFile(data,function(err,data){
	if(err){
		console.log(err);
	}
	console.log(data.toString());
});
console.log('文件的异步读取完成');

