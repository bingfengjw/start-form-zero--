/**
 * Created by Administrator on 2016/12/23.
 */
var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var IDCount = 4;
var dataUrl = 'public/index.html';

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

app.get('/', function (req, res) {
    readHtml(req, res, dataUrl);
});
app.post('/submit',urlencodedParser,function (req, res) {
    var response = {
        user4: {
            name: req.body.name,
            password: req.body.password,
            profession: req.body.profession,
            id: IDCount
        }
    };
    console.log(response);
    fs.readFile(__dirname + '/users.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('最开始的文件内容为 : ' + data);
            data = JSON.parse(data);
            data['user4'] = response['user4'];
            console.log('写入之前的内容为 : ' + data);
            console.log('写入之前的内容2为 : ' + JSON.stringify(data['user2']));
            fs.writeFile(__dirname + '/users.json', JSON.stringify(data), function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    fs.readFile(__dirname + '/users.json','utf8',function(err,data){
                        if(err){
                            console.log(err)
                        }else{
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
                            res.write(data.toString());
                            console.log('文件写入之后的内容为 : ' + data);
                        }
                    })
                }
            })
        }
    })
});
app.get('*', function (req, res) {
    readHtml(req, res, 'public/404.html');
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('链接服务器成功,host:%s:%s', host, port)
})

function readHtml(req, res, data) {
    fs.readFile(data, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
            res.write(data.toString());
            res.end();
        };
    })
}