var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('./'));
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/',function(req,res){
    res.sendFile('index.html',{root:dirname});
});

//登录
app.post('/login',urlencodedParser, function (req, res) {
    //返回的信息
    console.log(req.body);
    var login_response = {
        name:req.body.loginUser,
        password:req.body.loginPassword
    };
    console.log(login_response);
    console.log('-------------');
    fs.readFile(__dirname + "/json/user.json",'utf8',function(err,data){
        //定义一个用户列表，储存所有用户
        var userNameList = [];
        //console.log(__dirname);
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            //遍历所有用户
            for (item in data){
                //console.log('item : ' + item);
                //console.log('data[item] : ' + data[item]);
                userNameList.push(data[item].name);
            }
            console.log('添加之后的用户名列表(userNameList) : ' + userNameList);
            console.log('login_response.name : ' + login_response.name);
            var userNum = userNameList.indexOf(login_response.name);
            if (userNum != -1){
                console.log('存在用户');
                console.log('userNum = ' + userNum);
                console.log('当前用户的详细信息 = ' + data['user' + (userNum+1)]);
                console.log('当前用户的密码 = ' + data['user' + (userNum+1)].password);
                //验证密码
                var nowUserPassword = data['user' + (userNum+1)].password;
                if (nowUserPassword == login_response.password){
                    res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
                    res.end('登陆成功');
                    console.log('登陆成功')
                }else {
                    res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
                    res.end('登录失败');
                    console.log('登录失败(密码错误)');
                    return false;
                }
            }else{
                res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
                res.end('没有找到该用户，请注册');
                console.log('-------找不到用户-------');
            }
        }
    })
});
//登录部分结束

//注册
app.post('/register',urlencodedParser, function (req, res) {
    var register_response = {
        registerUser:req.body.name,
        registerPassword:req.body.password,
        sendCity : {
            sheng: req.query.sheng,
            shi: req.query.shi,
            qu: req.query.qu
        }
    };
    console.log(register_response);
});
/*app.post('/selectCity',urlencodedParser, function (req, res) {
    var sendCity = {
        sheng:req.query.sheng,
        shi:req.query.shi,
        qu:req.query.qu
    };
    console.log(sendCity);
})*/

var server = app.listen(8080,function(req,res){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host);
    console.log(port);
});