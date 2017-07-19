/**
 * Created by Administrator on 2017/1/4.
 */
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var path = require('path');
var fs = require('fs');

app.use(express.static("public"));
app.get('/', function (req, res) {
    res.sendFile('./public/index.html');
});
app.get('/search',function(req,res){
    //res.sendFile('userSearch.html',{root:path.join(__dirname,'public')});
    //res.sendFile(path.join(__dirname,'public','userSearch.html'));
    //上面两种方法需要path模块支持，下面的方法无需模块支持就可以使用，原因是之前会出现根目录未定义或者使用绝对路径的错误
    //所以需要定义根目录root为当前文件夹
    res.sendFile('public/userSearch.html',{root:__dirname});
});
app.post('/submit',urlencodedParser, function (req, res) {
    //储存用户输入进来的内容为对象
    var response = {
        name:req.body.userName,
        profession:req.body.userProfession,
        age:req.body.userAge,
        ID:req.body.userId
    };
    console.log(response);
    //储存最后输出的内容
    var content;
    //用来储存所有用户名的数组
    var dataArrar = [];
    //读取数据文件
    //异步读取
    fs.readFile(__dirname + '/users.json','utf8', function (err, data) {
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            //通过for...in循环找出所有用户，同时将所有用户储存在数组中
            for(item in data){
                dataArrar.push(item);
                console.log('dataArrar = ' + dataArrar);
                console.log('dataArrar.length = ' + dataArrar.length);
            }
            //通过数组的长度获取for循环取值范围
            for(var i=0;i<dataArrar.length;i++){
                //捕获当前获取到的用户名
                var userName = data['user' + (i+1)];
                console.log('user' + (i+1) + '的name ： ' + userName.name);
                console.log('response.name ： ' + response.name);
                //判断输入内容是否存在于数据库
                if(userName.name == response.name){
                    console.log(userName);
                    content = userName;
                    console.log('判断中最后的content为 ： ' + JSON.stringify(content));
                    //res.end(JSON.stringify(content));
                    return content;
                }else{
                    console.log('没有找到相关信息，请重新输入');
                    //res.end('没有找到相关信息，请重新输入');
                    content = '没有找到相关信息，请重新输入';
                    console.log('--------');
                }
            }
        }
        //测试发现无法直接使用res.end或者res.send方法直接输出内容，console.log打印正常（暂未解决）
        console.log('最后的内容为 ： ' + JSON.stringify(content));
        res.send(JSON.stringify(content));
        res.end();
    });
});

app.listen(8080,function(req,res){
    console.log('服务器已经创建');
});