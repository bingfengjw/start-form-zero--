
    <div id="header">
        <div id="backload"><div class="imgload"><img src="image/nav_btn_update@2x.png"></div></div>
        <div id="title">温暖的家</div>
        <div id="SetBtnde"><div class="setbtn"><img src="image/more@2x.bak.png"></div></div>
      </div>
      <div>
          <div id="loding">加载中...</div>
          <ul id="didselect">
          </ul>
      </div>
      <div id="tan" style="display:none"> 
       <div id="addDevs" ><p>添加设备</p></div>
       <div id="aboutDev"><p>关于</p></div>
       <div id="zxDev" ><p>注销</p></div>
       <div id="qxDev" ><p>取消</p></div>
       </div>
    <input type="hidden" id="session_user" value="<?php echo $_SESSION['user']; ?>">

    <link rel="stylesheet" type="text/css" href="css-js/userpasswordcss.css">
    <style type="text/css">
        ul {
            margin-top: 0px;
            text-align: center;
            width: 100%;
            padding: 0;
        }
        li {
            background-color:white;
            height: 100px;
            line-height: 100px;
            border-bottom: thin solid #000;
            list-style-type: none;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        #loding{
             font-size: 25px;
             text-align: center;
             margin-top: 45%;
        }
        #tan{
          position:fixed;
          left：0;
          bottom:0;
          border:solid 1px black; 
          background:rgba(249, 249,249,1);
          /*background-color: blue;*/
          width:  100%;
          height: 260px;
        }
        #addDevs{
         background: #f2f2f2;
           width: 100%;
           height:65px;
           border: 1px solid;
           /*background-color: red;*/
           text-align: center;
        }
               #aboutDev{
               background: #f2f2f2;
           width: 100%;
           height:65px;
           border: 1px solid;
           /*background-color: red;*/
           text-align: center;
        }
               #zxDev{
              background: #f2f2f2;
           width: 100%;
           height:65px;
           border: 1px solid;
           /*background-color: red;*/
           text-align: center;
        }
         #qxDev{
           width: 100%;
          background: #f2f2f2;
           height:65px;
           border: 1px solid;
           /*background-color: red;*/
           text-align: center;
        }
        #alertview{
            height: 200px;
            width: 100%;
            margin-top: 0px;
            background-color: red;
        }
        .divs{
            width: 100%;
            height: 100%;
        }
        .divimg{
            float: left;
            width: 100px;
            height: 100px;

        }
        .divimg img{
            width: 50%;
            height: 80%;
            margin-top: 10%;
        }
        .divname{
            width: 100%;
            height: 100%;
            font-size: 24;
            /*background-color: yellow;*/
        }
        #backgroundview{
            background-color: red;
            margin: 0 0 0 0;
            width: 100%;
            height: 100%;
        }
         #backload{
                 float: left;
                 /*background-color: red;*/
                 height: 70px;
                 line-height: 70px;
                 width: 20%;
                 font-size: 20;
                 text-align: center;
              }
         #SetBtnde{
                   float: left;
                   /*background-color: red;*/
                   height: 70px;
                   line-height: 70px;
                   width: 20%;
                   font-size: 24;
                   text-align: center;
              }
         #SetBtnde img{
                   width: 65%;
                   height: 80%;
                   margin-top: 10%;
               
              }
              .imgload{

                    width: 26%;
                    height: 36%;
                    /*background-color: blue;*/
                    margin-top: 32%;
                    margin-bottom: 32%;
                    margin-left: 37%;
                    margin-right: 37%;
              }
              .imgload img{
                    width: 100%;
                    height: 100%;

              }
              .setbtn{
                    width: 64%;
                    height: 70%;
                    /*background-color: blue;*/
                    margin-top: 20%;
                    margin-bottom: 10%;
                    margin-left: 18%;
                    margin-right: 18%;
              }
              .setbtn img{
                    width: 100%;
                    height: 100%;
              }
        /* #backload img{ 
                    background-color: blue;
                    width: 25%;
                    line-height: 35%;
                    height: 35%;
                    float: center;    
              }*/
    </style>
    <script type="text/javascript">
     //请求设备列表
     function getDeviceList() {
        var pack = new Object();
        var body = new Object();
        body.cmd = 1001;
        pack.body = body;
        var head = new Object();
        head.user = $("#session_user").val();
        pack.head = head;
        var req = JSON.stringify(pack);
        $.post("op.php", { param: req },
            function(data){
                // alert(data);    
                var obj = jQuery.parseJSON(data);
                if (obj.cmd != 1002){
                    alert("返回数据错误");
                    return;
                }
                if (obj.errno == 0){
                    $("#loding").css("display","none");
                  for (var i = obj.items.length - 1; i >= 0; i--) {
                    $("ul").append('<li onclick="roomPressed('+obj.items[i].id+', \''+obj.items[i].mac+'\',\''+obj.items[i].name+'\',\''+obj.items[i].isOwner+'\')"><div  class="divs"><div  class="divimg"><img src="image/cellImg2.png"></div><div id="txt" class="divname" >'+obj.items[i].name+'</div></div></li>');
                };
                }
                else alert('操作失败：'+obj.errno);
            });
     }
     //默认执行
     $(function() {
        getDeviceList();
     });
     //点击事件
     function roomPressed(id, mac,name,isOwner) {
      if (isOwner=="true"){
          window.location.href="?p=control_equipment&id="+id+"&mac="+mac+"&name="+name;
      }
      else{
          // alert(name);
          window.location.href="?p=guestcontrol&id="+id+"&mac="+mac+"&name="+name+"&isOwner="+isOwner;
      } 
     }
     window.onload=function(){
      //返回
      var oBtns=document.getElementById('back');
      oBtns.onclick=function(){ 
           //window.location.href="?p=signin"
           alert("刷新列表");
         }
      //添加设备
      var SetBtn=document.getElementById('SetBtnde');
      var SetList=document.getElementById('tan');
      SetBtn.onclick=function()
        { 
           // alert("点击");
            
           // window.location.href="?p=Add_Room"
         }
      }
       $(document).ready(function(){
               //设置
              $("#SetBtnde").click(function(){
                
                  if($("#tan").css("display","none")){
                    $("#tan").css("display","block")
                      return;
                  };
              });
              //取消
              $("#qxDev").click(function(){
                  if($("#tan").css("display","block")){
                    $("#tan").css("display","none")
                     return;
                  };
                });
              // //关于
               $("#aboutDev").click(function(){
                  if($("#tan").css("display","block")){
                    $("#tan").css("display","none")
                        window.location.href="?p=about"
                  };
                });
              //  //注销
                $("#zxDev").click(function(){
                  if($("#tan").css("display","block")){
                    $("#tan").css("display","none")
                     window.location.href="?p=signin"
                  };
                });
              //    //添加设备
                $("#addDevs").click(function(){
                  if($("#tan").css("display","block")){
                    $("#tan").css("display","none")
                   window.location.href="?p=add_room" 
                  };
                });
          });
     </script>




