var fs = require('fs');
var data = '../文本/input.txt';
console.log('准备打开文件');
fs.stat(data,function(err,stats){
	if(err){
		console.log(err);
	}
	console.log(stats);
	console.log('文件打开完毕');
	console.log('文件是否为文件? ',stats.isFile());
	console.log('文件是否为文件夹? ',stats.isDirectory());
})



/*stats类中的方法有：
方法	描述
stats.isFile()				如果是文件返回 true，否则返回 false。
stats.isDirectory()			如果是目录返回 true，否则返回 false。
stats.isBlockDevice()		如果是块设备返回 true，否则返回 false。
stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
stats.isSymbolicLink()		如果是软链接返回 true，否则返回 false。
stats.isFIFO()				如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
stats.isSocket()			如果是 Socket 返回 true，否则返回 false。*/