var fs = require('fs');
var zlib = require('zlib');
var data = '文本/input.zip';
//解压文件,解压出来的文件名为input.txt
fs.createReadStream(data)
	.pipe(zlib.createGunzip(data))
	.pipe(fs.createWriteStream('文本/input2.txt'));

console.log('文件解压缩完成');
