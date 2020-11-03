module.exports = {
	entry:__dirname  + '/app.js',	//入口文件地址
	output:{
		path:__dirname + "/public",//打包后的文件存放的地方
        filename:'bundle.js'//打包后输出文件的文件名
	}
}
