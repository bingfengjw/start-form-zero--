      
      <div id="header">
        <div id="back" >返回</div>
        <div id="titles" style="font-size:21px"></div>
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

      <div id="divbackground2" display="none">
           <div id="headtitle">
              <div id="title">历史</div>
           </div>
           <div class="backcolor">
               <ul id="History">   
               </ul>
           </div>
      </div>

      <div id="divbackground3" display="none">
          <div id="btnbackgroundselect">
              <div id="didselect">分配</div>
           </div>
           <div id="owners">
           
           <div id="ownersname">房主</div>
           <div id="userimage"><img src="image/usericon.jpg"></div>
           <div id="ownersphone"></div>
           </div>

           <div class="backcolor">
           <div id="guestname">房客</div>
           <ul id="Distribution">         
           </ul>
           </div>
      </div>
      <div id="tabbar">
               <div id="items1"><button id="button1">控制</button></div>
               <div id="items2"><button id="button2">历史</button></div>
               <div id="items3"><button id="button3">分配</button></div>
      </div>

      <input type="hidden" id="session_user" value="<?php echo $_SESSION['user']; ?>">
      <link rel="stylesheet" type="text/css" href="css-js/userpasswordcss.css">
     <style>
          .datetime{
              float: left;
              text-align: center;
              /*background-color: red;*/
              width: auto;
              height: 40px;
          }
          #titles{
           /*  background-color: red;*/
             text-align: center;
             float: left;
             width: 60%;
             height: 20%;
             font-size: 24px;
          }
          .backcolor{
              float: left;
              /*background-color: yellow;*/
              height: 80%;
              width: 100%;
          }
          .divs{
              /*background-color: red;*/
              float: left;
              width: 100%;
              height: 100%;
              border-top: 1px;
              border-bottom: 0px;
          }
          .divname{
              width: 100%;
              height: 100%;
              /*background-color: red; */
              float: left;
              font-size: 12px;
              margin-left: 10px;
          }


          #timep{
               /*background-color: blue;*/
               float: left;
               width: 80%;
               height: 50%;
               text-align:center;
               
          }
          #timep p{

               /*background-color: green;*/
               float: left;
               width: 100%;
               height: 30%;
               line-height: 30%;
               text-align: center;
               margin-top:10%;
               font-size: 15px;

          }
          #timep2{
               /*background-color: red;*/
               text-align: center;
               float: left;
               width: 80%;
               height: 50%;
          }
          #timep2 p{
               /*background-color: yellow;*/
               float: left;
               width: 100%;
               height: 100%;
               line-height: 100%;
               text-align: center;
               margin-top: 0px;
               font-size: 15px;
          }

          #didselect{

            width: 100%;
            height: 50%;
            margin-top: 25;
            /*background-color: green;*/
            text-align: center;
            font-size: 24px;

          }


          .divimg{
              float: left;
              /*background-color: blue;*/
              width:  20%;
              height: 80%;
          }
          .divimg img{
              width: 100%;
              height: 100%;
              margin-top: 10%;
          }

          .divUser{
              width: 100px;
              height: 100px;
              /*background-color: blue;*/
              text-align: left;
          }
          .divUser img{
              width: 50px;
              height: 50px;
              /*background-color: green;*/
          }
          .divname{
              width: 100%;
              text-align: center;
              height: 100%;
              font-size: 14px;
          }
          
          #divbackground{
              display: block;
          }


          #divbackground2{
              /*background-color: blue;*/
              display: none;
              height: 90%;
              width: 100%;
          }
          #divbackground3{
              display: none;
              /*background-color: red;*/
              height: 90%;
              width: 100%;     
          }
          #divbackgrounds{
             width: 100%;
             height: 70%;
             margin-top: 0%;
             background: url('image/ctlImg.png') no-repeat center;
             background-size: auto 90%;
             /*background-color: yellow;*/
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
          #owners{
               width: 100%;
               height: 20%;
               /*background-color: yellow;*/
          }
          #ownersname{
            border-top: solid;
            border-bottom: solid;
               width: 100%;
               height: 25px;
               
               text-align: center;
               
               font-size: 19px;
               /*background-color: red;*/
          }
          #ownersphone{
                float:left; 
                margin-left: 0%;
                width: 60%;
                height: 25px;
                margin-top: 30px;
                text-align: center;
                font-size: 19px;
                /*background-color: blue;*/
          }
          #userimage{
                float: left;
                margin-top: 5px;
                /*background-color: red;*/
                width: 20%;
                height: 75px;
          }
          #userimage img{
            width: 100%;
            height: 100%;
            margin-top: 0px;


          }
          #guestname{
            border-bottom: solid;
                border-top: solid;
                width: 100%;
                height: 25px;
                text-align: center;
                /*background-color: green;*/
                font-size: 19px;
          }
      </style>
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
        var userphone;
        //转编码 
        document.getElementById('ownersphone').innerHTML=$("#session_user").val();
        
        document.getElementById('titles').innerHTML=utf8ToChar(Request.name);

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
        // var iCode, iCode1, iCode2;  
        // iCode = parseInt("0x" + str.substr(1, 2));  
        // iCode1 = parseInt("0x" + str.substr(4, 2));  
        // iCode2 = parseInt("0x" + str.substr(7, 2));  
        // return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
        }

         //获得历史记录
          function getHistorys() {
              var head = new Object();
              head.user = $("#session_user").val();
               userphone=$("#session_user").val();
              
              var body = new Object();
              body.cmd = 1009;
              body.id = GetQueryString("id");
              // alert(GetQueryString("name"));
              var pack = new Object();
              pack.head = head;
              pack.body = body;
              var req = JSON.stringify(pack);
              $.post("op.php", { param: req },
                  function(data){
                    // alert("历史数据");
                      // alert(data);
                      var obj = jQuery.parseJSON(data);
                      if (obj.cmd != 1010) {
                          alert("返回数据错误");
                          return;
                      }
                      if (obj.errno == 0) {
                          for (var i = obj.items.length - 1; i >= 0; i--) {
                              $("#History").append('<li><div  class="divs"><div class="divimg"><img src="image/add.jpg"> </div><div id="timep"><p>'+obj.items[i].owner+'授权'+obj.items[i].guest+'</p></div><div id="timep2"><p>'+obj.items[i].datetime+'</p></div></div></li>');
                          };
                      }
                      else alert('操作失败：'+obj.errno);
                  });
          }
          function getDistributions() {
              var head = new Object();
              head.user = $("#session_user").val();
              var body = new Object();
              body.cmd = 1013;
              body.id = GetQueryString("id");
              body.isOwner=true;
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
                              for (var i = obj.guests.length - 1; i >= 0; i--) {

                                  $("#Distribution").append('<li><div  class="divs"><div class="divimg"><img src="image/usericon.jpg"> </div><div id="timep"><p>'+obj.owners[0].owner+'授权'+obj.guests[0].guest+'</p></div><div id="timep2"><p>'+obj.guests[0].checkInDatetime+'-'+obj.guests[0].checkOutDatetime+'</p></div></div></li>');   
                              };
                          }
                          else alert('操作失败：'+obj.errno);
                      });
          }
          $(function() {
              getDistributions();
              getHistorys();
          });

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
              var oBtns=document.getElementById('btnbackgroundselect');
              oBtns.onclick=function(){
                      var s = document.getElementById("txt");
                      location.href="distribution.php?.php&id="+Request.id+"&phone="+userphone;
  
              }
              var boxBtn=document.getElementById('box');
              boxBtn.onclick=function(){
                   alert("锁盒开");
              }
              var lockBtn=document.getElementById('lock');
              lockBtn.onclick=function(){
                   alert("锁头开");
              }
          }
          $(document).ready(function(){
              $("#button1").click(function(){
                  $("#states").css("display","block");
                  $("#statecontroller").css("display","block");
                  $("#divbackgrounds").css("display","block");
                  $("#divbackground2").css("display","none");
                  $("#divbackground3").css("display","none");
              });
              $("#button2").click(function(){
                  $("#states").css("display","none");
                  $("#statecontroller").css("display","none");
                  $("#divbackgrounds").css("display","none");
                  $("#divbackground2").css("display","block");
                  $("#divbackground3").css("display","none");
              });
              $("#button3").click(function(){
                $("#states").css("display","none");
                  $("#statecontroller").css("display","none");
                  $("#divbackgrounds").css("display","none");
                  $("#divbackground2").css("display","none");
                  $("#divbackground3").css("display","block");
              });
          });
      </script>
       