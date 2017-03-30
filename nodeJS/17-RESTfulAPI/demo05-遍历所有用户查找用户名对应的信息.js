/**
 * Created by Administrator on 2016/12/26.
 */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(express.static('public'));
app.get('/', function (req, res) {
    console.log(req);
    res.sendFile('public/index.html');
});

app.post('/submit',urlencodedParser,function (req, res) {
    var response = {
        name:req.body.name,
        password:req.body.password,
        profession:req.body.profession
    };
    console.log('response : ' + JSON.stringify(response));
    fs.readFile(__dirname + '/users.json','utf8', function (err, data) {
        if(err){
            console.log(err)
        }else{
            //需要先将data转换为js格式，然后再使用对象的方式点出
            var file = JSON.parse(data);
            console.log('文件内容为 ： ' + data);
            console.log(file['user2']);
            console.log('文件2内容为 ： ' + file.user2.name);
            for(item in file){
                console.log('item:' + item);
                for(var i=1;i<item.length;i++){
                    if(file['user' + i].name == 'suresh'){
                        //输出被找到的用户的名字
                        console.log(file['user' + i].name);
                    }
                }
            }
        }
    });
    res.end(JSON.stringify(response));
});
app.listen(8080, function () {
    console.log('服务器已创建在端口8080上');
});