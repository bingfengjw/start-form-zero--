/**
 * Created by Administrator on 2017/1/6.
 */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/search', function (req,res) {
    res.sendFile('public/userSearch.html',{root:__dirname});
});

app.post('/submit',urlencodedParser, function (req, res) {
    var response = {
        name:req.body.userName,
        profession:req.body.userProfession,
        age:req.body.userAge,
        ID:req.body.userId
    };
    fs.readFile(__dirname + '/users.json','utf8', function (err, data) {
        var userArr = [];
        if(err){
            console.log(err)
        }else{
            data = JSON.parse(data);
            for(item in data){
                console.log('item = ' + item);
                userArr.push(item);
            }
            for(var i=1;i<=userArr.length;i++){
                console.log('用户' + i + '的详细信息为：' + data['user' + i]);
                console.log('用户' + i + '的姓名为：' + data['user' + i].name);
                if(response.name == data['user' + i].name){
                    delete data['user' + i];
                    console.log('删除后的用户列表为 ：' + data);
                    res.send(JSON.stringify(data));
                }
            }
            console.log('-----------------');
        }
    })
});

app.listen(8080, function () {
    console.log('服务器创建完成');
});