var server = require('./10.1-创建服务器.js');
var route = require('./10.2-创建路由器.js');

server.start(route.route);
