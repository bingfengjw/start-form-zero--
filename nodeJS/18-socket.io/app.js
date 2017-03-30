/**
 * Created by Administrator on 2017/2/14.
 */
var socket = require('socket.io');
var express = require('express');
var app = express();
var urlendcodedParser = require('body-parser').urlencoded({extended:false});
app.use(express.static('./'));
var httpServer = app.listen(8080);
var io = socket.listen(httpServer);

io.on('connection', function (socket) {
    app.post('/test',urlendcodedParser, function (req, res) {
        var response = {
            name:req.body.name,
            password:req.body.password
        };
        console.log('用户名是：' + response.name);
        console.log('密码是：' + response.password);
        socket.emit('welcome',{
            name:response.name,
            password:response.password
        });
        socket.on('return', function (data) {
            console.log('用户名是：' + data.name);
            console.log('密码是：' + data.password);
        });
    });
});