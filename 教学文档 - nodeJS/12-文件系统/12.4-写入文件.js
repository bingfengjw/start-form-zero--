var fs = require('fs');
var data = '../文本/input.txt';
var content = '我要写入的是这一段内容';

console.log('写入文件之前的内容为: ' + fs.readFileSync(data).toString());

fs.writeFile(data,content,function(err){
	if(err){
		console.log(err);
	};
	console.log('文件写入成功!');
	
	fs.readFile(data,function(err,data){
		if(err){
			console.log(err);
		}
		console.log('文件写入之后的内容为: ' + data.toString());
	})
});
