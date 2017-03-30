//__filename
//__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，
//且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
console.log('当前文件的绝对路径: ' + __filename);

//__dirname
//__dirname 表示当前执行脚本所在的目录。

console.log('当前执行脚本所在的目录: ' + __dirname);

//process
//process 是一个全局变量，即 global 对象的属性。
process.on('exit',function(code){
	//以下代码为程序执行完(退出后会运行);
	console.log('process的exit事件被触发');
	console.log('退出码为: ',code);
});
console.log('程序运行结束');
