
<html> 
    <head>
      <meta charset="utf-8">
      <!-- <meta name="viewport" content="width=480px,target-densitydpi=device-dpi,user-scalable=no;" /> -->
      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
      <title>Homey</title>
      <input type="hidden" id="session_user" value="<?php echo $_SESSION['user']; ?>">
      <script src="css-js/jquery-1.11.1.min.js"></script>
      <script src"js.js"></script>
      <link rel="stylesheet" type="text/css" href="css-js/homeystyle.css">
      <style>
          #titles{
           /*  background-color: red;*/
              text-align: center;
             float: left;
             width: 60%;
             height: 70px;
             font-size: 24px;
          }

          .backcolor{
              /*background-color: yellow;*/
          }
          .divs{
              float: left;
              width: 100%;
              height: 100%;

          }
          .divimg{
              float: left;
              /*background-color: blue;*/
              width: 100px;
              height: 100px;

          }
          .divimg img{
              width: 50%;
              height: 50%;
              margin-top: 10%;
          }
          .divname{
              width: 100%;
              height: 100%;
              font-size: 24;
              /*background-color: yellow;*/
          }
          .divUser{
              width: 100px;
              height: 100px;
              background-color: blue;
              text-align: left;
          }
          .divUser img{
              width: 50px;
              height: 50px;
              background-color: green;
          }
          .divname{
              width: 100%;
              text-align: center;
              height: 100%;
              font-size: 14px;
          }
          #divbackgrounds{
             width: 100%;
             height: 70%;
             margin-top: 0%;
             background: url('image/ctlImg.png') no-repeat center;
             background-size: auto 90%;
             /*background-color: yellow;*/
          }
          #back{
     float: left;
     /*background-color: red;*/
     height: 70px;
     line-height: 70px;
     width: 20%;
     font-size: 19px;
     text-align: center;
}
          #image{
             width: 60%;
             height: 90%;
             margin-left:20%;
             margin-top:5%;
             background-color: blue;
          }
          #image img{
             margin-top: 0px;
             width: 100%;
             height: 95%;
          }
          #lock{
             width: 100%;
             height: 50%;
             margin-top: 0px;
             /*background:#fff;*/
             /*opacity:0.0;*/
             /*z-index:10;*/
             
          }
          #box{
             background-color: green;
             width: 100%;
             height: 50%;
             opacity:0.0;
             z-index:10;
          }
          .divlock{
             width: 60%;
             height: 200%;
             margin-left: 20%;
          }
          .divlock img{
               width: 100%;
               height: 100%;
               line-height: 100%;

          }
          #states{
             width:100%;
             height:10%;   
             margin-top: 5px;
             text-align: center;
             font-size:  18px;   
          }
          #imageback{
             background-color: blue;
             width: 60%;
             height: 415px;
             margin-left: 20%;
          }
      </style>
    </head>
      <body>
        <div id="header">
        <div id="back" >返回</div>
        <div id="titles" style="font-size:24px"></div>
        </div>
          <div id="statecontroller">
        <div id="statestring">设备连接中...</div>
      </div>
      <div id="divbackgrounds">
          <div id="lock"><div class="divlock">
           </div> </div>
          <div id="box"></div> 
           
      </div>
       <div id="states">
          锁头：关；     锁盒： 关；     钥匙： 1；   电量：100%
       </div>

        <script type="text/javascript">
         
          function UrlSearch() 
          {
          var name,value; 
          var str=location.href; //取得整个地址栏
          var num=str.indexOf("?") 
          str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

          var arr=str.split("&"); //各个参数放到数组里
          for(var i=0;i < arr.length;i++){ 
          num=arr[i].indexOf("="); 
          if(num>0){ 
                   name=arr[i].substring(0,num);
                   value=arr[i].substr(num+1);
                   this[name]=value;
          } 
          } 
          } 
        //实例化
        var Request=new UrlSearch(); 
        //转编码 
        // alert("这是名字: "+utf8ToChar(Request.name));
        document.getElementById('titles').innerHTML=utf8ToChar(Request.name);
        var inDateTime;
        var outDateTime;
        function getDistributions() {
              var head = new Object();
              head.user = $("#session_user").val();
              var body = new Object();
              body.cmd = 1013;
              // alert(Request.id);
              body.id = Request.id;
              body.isOwner=false;
              var pack = new Object();
              pack.head = head;
              pack.body = body;
              var req = JSON.stringify(pack);
              $.post("op.php", { param: req },
                      function(data){
                        // alert("分配记录");
                          // alert(data);
                          var obj = jQuery.parseJSON(data);
                          if (obj.cmd != 1014) {
                              alert("返回数据错误");
                              return;
                          }
                          if (obj.errno == 0) {
                              // alert("获得了");
                               var Request=new UrlSearch(); 
                               var dates = new Date();
                               // alert(dates);
                               var inData=new Date(obj.guests[0].checkInDatetime);
                               var outData=new Date(obj.guests[0].checkOutDatetime);
                              if (dates<inData || dates>outData  ) {
                                $("#boxBtn").css("display","none")
                                $("#lockBtn").css("display","none")
                                   alert("没到权限时间");
                              } else{
                                    alert("锁盒开");
                                    
                              };
                            
                              
                          }
                          else alert('操作失败：'+obj.errno);
                      });
          }
           $(function() {
             
              
          });

        function utf8ToChar(str) {
          var cn_string = '';
          for (var i = 0; i < str.length / 9; i++) {
            var cn_char = str.substr(i*9, i+9);
            var iCode, iCode1, iCode2;
            iCode = parseInt("0x" + cn_char.substr(1, 2));  
            iCode1 = parseInt("0x" + cn_char.substr(4, 2));  
            iCode2 = parseInt("0x" + cn_char.substr(7, 2));  
            cn_string += String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
          };
          return cn_string;
        }
        function GetQueryString(name)
          {
              var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
              var r = window.location.search.substr(1).match(reg);
              if(r!=null)return  unescape(r[2]); return null;
          }
         window.onload=function(){
              var oBtn=document.getElementById('back');
              oBtn.onclick=function(){
                  window.location.href="?p=devicelist"
              }
              var boxBtn=document.getElementById('box');
              boxBtn.onclick=function(){
                 getDistributions();
                   
              }
              // var lockBtn=document.getElementById('lock');
              // lockBtn.onclick=function(){
              //    getDistributions();
              //    alert("1");
                 
              // }

          }
         </script>
    </body>

</html>