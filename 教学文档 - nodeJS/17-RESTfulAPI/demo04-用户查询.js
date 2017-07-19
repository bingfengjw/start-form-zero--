/**
 * Created by Administrator on 2016/12/26.
 */
var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

app.get('/',function(req,res){
    app.sendFile('public/index.html');
});
app.get('/:id',function(req,res){
    //需要输入用户的id之后开始查询
    //必须要在地址栏输入    / + ‘具体的id’    之后才能够实现查询
    fs.readFile(__dirname + '/users.json','utf8',function(err,data){
        data = JSON.parse(data);
        var user = data['user' + req.params.id];
        console.log('user : ' + JSON.stringify(user));
        //req.params为输入的内容，返回值为get指向的内容和获取到的内容
        console.log('req.params : ' + JSON.stringify(req.params));
        res.end(JSON.stringify(user));
    })
});

var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器已创建在http://%s:%s',host,port);
});