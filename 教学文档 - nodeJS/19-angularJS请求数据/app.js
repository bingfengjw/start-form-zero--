/**
 * Created by Administrator on 2017/2/15.
 */
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.static('./'));
app.get('/', function (req, res) {
    console.log(req);
    res.sendFile('index.html',{root:__dirname});
    console.log('---------------===========--------------------')
});
app.post('/tijiao',urlencodedParser, function (req, res,data) {
    console.log(req);
    console.log(data);
    console.log('--------------------');
    var txt = req.query;
    console.log(txt);
});
var httpServer = app.listen(8080, function (req, res) {
    console.log(req);
    console.log('--------------------');
});