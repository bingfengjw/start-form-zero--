var fs = require('fs');
var data = '../文本/input.txt';
fs.open(data,'r',function(err){
	if(err){
		console.log(err);
	}
	console.log(data);
})
console.log('文件已经打开');
console.log('程序运行结束');

/*fs.open(path, flags[, mode], callback)
参数
参数使用说明如下：
path	 - 文件的路径。
flags 	 - 文件打开的行为。具体值详见下文。
mode	 - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
callback - 回调函数，带有两个参数如：callback(err, fd)。*/

/*flags 参数可以是以下值：
Flag	描述
r	以读取模式打开文件。如果文件不存在抛出异常。
r+	以读写模式打开文件。如果文件不存在抛出异常。
rs	以同步的方式读取文件。
rs+	以同步的方式读取和写入文件。
w	以写入模式打开文件，如果文件不存在则创建。
wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
w+	以读写模式打开文件，如果文件不存在则创建。
wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
a	以追加模式打开文件，如果文件不存在则创建。
ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
a+	以读取追加模式打开文件，如果文件不存在则创建。
ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。*/