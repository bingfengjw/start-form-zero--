/**
 * Created by hxsd on 2016/5/27.
 */
var socket = require("socket.io");
var userAll = [];
var userSex = [];
var userAvatar = [];
var userNum = 0;
var userDelNum = 0;


module.exports.listen = function (httpServer) {
    //让socket模块监听httpServer
    var io = socket.listen(httpServer);
    //;聊天室服务器
    //服务器端会监听客户端的socket连接请求 - 会触发一个名为connection的指令
    io.on("connection", function (socket) {

        console.log("有客户端请求:" + socket.id);
        socket.emit("welcome", {message: "欢迎您!"});


        //监听新用户登录聊天室的事件(昵称)
        socket.on("user_enter", function (data) {

            userAll.push(data.nickName);
            userSex.push(data.sex);
            userAvatar.push(data.avatar);
            userDelNum = userAll.indexOf(data.nickName);

            if (data.sex == '<img src="images/sexMan.png">' ){
                data.sex = '帅哥';
            }else if (data.sex == '<img src="images/sexWomen.png">'){
                data.sex = '美女';
            }

            console.log("userAll --- " + userAll);
            console.log("userAll[0] --- " + userAll[0]);
            console.log("userSex --- " + userSex);
            console.log("userAvatar --- " + userAvatar);
            console.log("data.nickName --- " + data.nickName);
            console.log("data.sex --- " + data.sex);
            console.log("data.avatar --- " + data.avatar);

            console.log("userAll.length ----------- " + userAll.length);
            console.log("userAll[0].nickName ----------- " + userAll[0].nickName);

            console.log("新用户: " + data.nickName);

            socket.emit("nameRepeat", {
                userAll:userAll
            });

            //将用户的昵称保存到socket中
            socket.nickName = data.nickName;

            //把新用户登录信息广播给所有在线用户
            //socket.broadcast会将消息广播给除了自己之外的所有用户
            socket.broadcast.emit("user_entered", {
                nickName: data.nickName,
                sex: data.sex,
                avatar: data.avatar,
                userAll: userAll,
                userNum: userAll.length,
                userSex: userSex,
                userAvatar: userAvatar,
                userDelNum: userDelNum
            });

            //向当前这个客户端发送一个已登录的信息
            socket.emit("my_entered", {
                nickName: data.nickName,
                sex: data.sex,
                avatar: data.avatar,
                userAll: userAll,
                userNum: userAll.length,
                userSex: userSex,
                userAvatar: userAvatar,
                userDelNum: userDelNum
            });

            //聊天消息
            socket.on("message", function (data) {
                console.log(socket.nickName + ":" + data.content);
                //如果客户端发送的是聊天内容
                if (data.type == "userMessage") {
                    // 1)将该聊天内容发送给所有在线用户,携带上发言者的昵称
                    //将原来保存在socket中的昵称提取出来,再储存到data中
                    data.nickName = socket.nickName;
                    socket.broadcast.send(data);

                    // 2)将该聊天内容发回给自己
                    data.nickName = "我";
                    data.type = "myMessage";
                    socket.send(data);
                }
            })

        });

        //离开聊天室
        socket.on("disconnect", function (data) {
            console.log(socket.nickName + "离开了聊天室");

            //用户离开删除用户名
            userAll.splice(userAll.indexOf(socket.nickName), 1);
            userSex.splice(userSex.indexOf(data.userSex), 1);
            userAvatar.splice(userAvatar.indexOf(data.userAvatar), 1);

            userNum = userAll.length;
            console.log("离开后的userAll --- " + userAll);
            console.log("离开后的userSex --- " + userSex);
            console.log("离开后的userAvatar --- " + userAvatar);

            //计算第几个用户离开则将第几个li删除


            socket.broadcast.emit("user_leave",
                {
                    nickName: socket.nickName,
                    userNum: userNum,
                    userAll: userAll,
                    userSex: userSex,
                    userAvatar: userAvatar
                });

        });

    });
};
