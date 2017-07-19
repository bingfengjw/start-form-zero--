/**
 * Created by hxsd on 2016/5/30.
 */
var userAll;
$(function () {
    //调用io()方法,连接服务器,并获得客户端socket对象
    var clientSocket = io();

    //点击选取性别radio
    $(".sexChoose").click(function () {
        if ($("#sex1")[0].checked == true) {
            $(".sexChoose").find("img:first").attr("src", "images/radio2.png");
            $(this).find("img:first").attr("src", "images/radio1.png");
        }
        if ($("#sex2")[0].checked == true) {
            $(".sexChoose").find("img:first").attr("src", "images/radio2.png");
            $(this).find("img:first").attr("src", "images/radio1.png");
        }
    });
    //头像选择
    $("#avatarList").find("li").click(function () {
        var imgSrc = $(this).find("img").attr("src");
        $("#avatar").find("img").attr("src", imgSrc);
    });

    //获取昵称
    var nickName = "";
    var pattern = /^[\u4e00-\u9fa5]+$/;
    //用户名合法验证
    $(".login_input").keyup(function (e) {
        nickName = $.trim($(".login_input").val());
        $("#point").html("");
        if (nickName.length == 0) {
            $("#point").html("用户名不能为空");
        }
        if (e.keyCode == 32) {
            $("#point").html("用户名不能包含空格");
        }
        if (pattern.test(nickName)) {
            $("#point").html("用户名不能包含中文");
        }
        if (nickName.length >= 6) {
            $("#point").html("用户名不能超过6个字符");
        }
    });

    clientSocket.on("nameRepeat",function(data){
        $("#nicknameInput").keyup(function(){
            alert(data);
            var nameRepeat = data.userAll.indexOf(nickName) - data.userAll.lastIndexOf(nickName);
            if(nameRepeat != 0 ){
                $("#point").html("用户名重复");
            }
        })
    })


    $("#signIn").click(function () {

        nickName = $(".login_input").val();

        //用户名验证
        if (nickName.length == 0) {
            $("#point").html("用户名不能为空");
            return;
        }
        if (nickName.indexOf(" ") != -1) {
            $("#point").html("用户名不能包含空格");
            return;
        }
        if (nickName.length >= 6) {
            $("#point").html("用户名不能超过6个字符");
            return;
        }
        if (pattern.test(nickName)) {
            $("#point").html("用户名不能包含中文");
            return;
        }

        //性别判断
        var sex = "";
        if ($("#sex1")[0].checked == true) {
            sex = "帅哥";
        }
        if ($("#sex2")[0].checked == true) {
            sex = "美女";
        }
        if (sex == "帅哥" ){
            sex = '<img src="images/sexMan.png">';
        }else if (sex == "美女"){
            sex = '<img src="images/sexWomen.png">';
        }

        //头像获取
        var avatar = $("#avatar").find("img").attr("src");

        //将昵称 性别等信息发送给服务器
        clientSocket.emit("user_enter", {
            nickName: nickName,
            sex: sex,
            avatar: avatar
        });


        //用户进入服务器报告
        clientSocket.on("user_entered", function (data) {
//                    alert(data.nickName + "进入了聊天室");

            //聊天窗口报告
            var content = "<p class='systemMessage'>[系统消息] 欢迎<span class='sex'>" + data.sex + "</span>：<div class='userAvatar'><img src='" + data.avatar + "'></div><span class='nickName'>" + data.nickName + "</span>进入聊天室!<br></p>";
            $("#messageRoom").append(content);

            //性别图标转换
            sexPic(data);
            //用户列表添加
            userList(data);

            //滚动
            $("#messageRoom").scrollTop($("#messageRoom").prop("scrollHeight"));
            $("#chatLeft").scrollTop($("#chatLeft").prop("scrollHeight"));

            //人数统计
            $("#count").html("<span class='userNumTxt'>USER NUMBER</span><br>" + data.userNum);
        });

        //用户进入服务器向自己报告
        clientSocket.on("my_entered", function (data) {
//                    alert("欢迎您回来,<div class='userAvatar'><img src='"+ data.avatar +"'></div>" + data.nickName);

            //显示聊天界面
            $("#inner").hide();
            $("#chatroom").show();

            //聊天室界面系统消息
            var content = "<p class='systemMessage'>[系统消息] 您已进入聊天室,请注意自己的发言!<br></p>";
            content += "<p class='systemMessage'>欢迎您进入聊天室,请对您的言论负责.</p>";
            $("#messageRoom").append(content);

            //性别图标转换
            sexPic(data);
            //用户列表添加
            userList(data);

            //滚动
            $("#messageRoom").scrollTop($("#messageRoom").prop("scrollHeight"));
            $("#chatLeft").scrollTop($("#chatLeft").prop("scrollHeight"));

            //人数统计
            $("#count").html("<span class='userNumTxt'>USER NUMBER</span><br>" + data.userNum);

        });

        //点击发送消息
        $("#send").click(function () {
            var message = $("#message").val();
            $("#prompt").html("");
            if (message.length >= 40) {
                $("#prompt").html("内容过长,请重新输入");
                return;
            }
            var data = {
                type: "userMessage",
                content: message,
                avatar: avatar
            };
            clientSocket.send(data);

            $("#message").val("");
        });

        //消息显示
        clientSocket.on("message", function (data) {
            //将消息显示在聊天窗口
            var content;
            content = "<div class='" + data.type + "'><div class='talkAvatar'><img src='" + data.avatar + "'></div><span class='userContent'>" + data.content + "</span></div>";

            //发送消息之后显示
            $("#messageRoom").append($.trim(content));

            //屏幕滚动
            $("#messageRoom").scrollTop($("#messageRoom").prop("scrollHeight"));
        });

        //回车发送消息
        $("#message").keyup(function (e) {
            if (e.keyCode == 13) {
                //模拟点击函数
                $("#send").click();
            }
        });

        //用户离开提示
        clientSocket.on("user_leave", function (data) {
            //将消息显示在聊天窗口
            var content = "<p class='systemMessage'>[系统提示] <span class='nickName'>" + data.nickName + "</span>离开了聊天室</p><br> ";
            //发送消息之后显示
            $("#messageRoom").append(content);

            //滚动
            $("#messageRoom").scrollTop($("#messageRoom").prop("scrollHeight"));

            //人数统计
            $("#count").html("<span class='userNumTxt'>USER NUMBER</span><br>" + data.userNum);

            //性别图标转换
            sexPic(data);
            //用户列表添加
            userList(data);
        })
    })

});
//联系人列表添加
function userList(data) {
    $("#userList").find("li").remove();
    for (var i = 0; i < data.userNum; i++) {
        var userList = "";
        userList += "<li class='userListPro'>";
        userList += "<div class='userListPic'>";
        userList += "<img src='" + data.userAvatar[i] + "'>";
        userList += "</div>";
        userList += "<div class='userListRight'>";
        userList += "<h4 class='userListName'>";
        userList += "昵称: " + data.userAll[i];
        userList += "</h4>";
        userList += "<br>";
        userList += "<p class='userListSex'>";
        userList += "性别: " + data.userSex[i];
        userList += "</p>";
        userList += "</div>";
        userList += "</li>";
        $("#userList").append(userList);
    }
}

//性别图标转换
function sexPic(data,i){
    if (data.sex == "帅哥" ){
        data.userSex[i] = '<img src="../images/sexMan.png">';
    }else if (data.sex == "美女"){
        data.userSex[i] = '<img src="../images/sexWomen.png">';
    }
}