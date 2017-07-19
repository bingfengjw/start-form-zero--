var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
//这两个模块负责分析上传文件以及解析post请求
var bodyParser = require('body-parser');
var multer = require('multer');
//似乎每次提交之后都会默认生成一个和filename相同名称的文件在指定文件夹下,无论时候更改名字都会生成
//并且无论如何指定目录这个文件都可以生成,但是需要更改后缀名

app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(urlencodedParser);
app.use(multer({dest:'./public/tmp/'}).array('pic_up'));


app.get('/',function(req,res){
	//readHtml(req,res,'public/index.html');
	console.log(__dirname);
})

app.post('/submit',urlencodedParser,function(req,res){
	console.log('----------开始提交----------');
	//当前被上传的文件的信息
	console.log('req.files[0] = ' + req.files[0]);
	var response = {
		name:req.body.name,
		password:req.body.password
	}
	console.log('response.name = ' + response.name);
	console.log('response.password = ' + response.password);
	
	var des_file = __dirname + '/' + req.files[0].destination + '/' + req.files[0].originalname;
	//定义新的存储路径,同时重新定义名称为原文件名
	//var des_file = __dirname + '/' + req.files[0].destination + '/' + req.files[0].filename + '.jpg';
	fs.readFile(req.files[0].path,function(err,data){
		console.log('req.files[0].path = ' + req.files[0].path)
		fs.writeFile(des_file,data,function(err){
			if(err){
				console.log('上传错误为 : ' + err);
			}else{
				var response = {
					message:'文件上传成功',
					filename:req.files[0].originalname
				};
			};
			console.log('提交成功之后的response = ' + response);
			res.end(JSON.stringify(response));
			//JSON.stringify --- 转换为json
		});
	});
	console.log('---------提交完毕----------');
});

app.listen(8080,function(){
	console.log('正在监听端口8080');
})

function readHtml(req,res,data){
	fs.readFile(data,function(err,data){
		if(err){
			console.log(err);
		}else{
			res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
			res.write(data.toString());
			res.end();
		}
	})
}
