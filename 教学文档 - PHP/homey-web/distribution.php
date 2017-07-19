<html> 
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=480px,target-densitydpi=device-dpi,user-scalable=no;"/>
      <title>Homey</title>
      <link rel="stylesheet" type="text/css" href="css-js/homeystyle.css">
           <script src="css-js/jquery-1.11.1.min.js"></script>
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
        // alert(Request.phone);
        // alert(Request.id);
       var date = new Date();
       var now = date.getFullYear()+'-'+trim(date.getMonth()+1)+'-'+trim(date.getDate());
       var hms = trim(date.getHours())+':'+trim(date.getMinutes()+":"+trim(0));
       var news=now+" "+hms;
       window.onload=function(){
      // var oBtn=document.getElementById('back');
      // oBtn.onclick=function(){ 
      //       window.location.href=
      // }
      // var oBtn=document.getElementById('input_div_btn');
      // oBtn.onclick=function(){ 
      //        btnPressed();
      //        // window.location.href="javascript:history.back(-1)";
      // }
      }
      function trim(value){
          if ((value+'').length==1) 
          {
            return '0'+value;
          } 
          else
          {
            return value;
          }
      }
       function btnPressed(){
        // alert("开始分配");
         var head = new Object();
              // alert(Request.userphone);
              head.user = Request.phone;
              var body = new Object();
              body.cmd = 1007;
              body.guest=$("#phone").val();
              body.checkInDatetime=news;
              body.checkOutDatetime=$("#OutEnterdate").val()+" "+$("#OutEntertime").val()+":"+trim(0);
              body.id=Request.id;
              // alert(body.guest,body.checkInDatetime,body.checkOutDatetime,body.id);
              var pack = new Object();
              pack.head = head;
              pack.body = body;
              var req = JSON.stringify(pack);
              $.post("op.php", { param: req },
                      function(data){
                        // alert(data);
                      
                          var obj = jQuery.parseJSON(data);
                          if (obj.cmd != 1008) {
                              alert("返回数据错误");
                              return;
                          }
                          if (obj.errno == 0) {
                              
                               window.location.href="javascript:history.back(-1)";
                                alert("分配成功");
                          }
                          else alert('操作失败：'+obj.errno);
                      });
      }

      $(function() {
        // alert("时间");
        $("#Enterdate").val(now);
        
        // alert( $("#Entertime").val(hms));
        $("#Entertime").val(hms);
        

      });
     </script>
     <style>
     #title{
      float: left;
      width: 60%;
      height: 70px;
      font-size: 24;
      text-align: center;
      }
      #header{
      background-color: #FFD700;
      text-align: center;
      height: 70px;
      line-height: 70px;
      margin-top: 0;
      }
      #back{
     float: left;
     /*background-color: red;*/
     height: 70px;
     line-height: 70px;
     width: 20%;
     font-size: 19;
     text-align: center;
     }

    </style>
    </head>
    <body>
      <div id="header">
        <div id="back" onclick="javascript:history.back(-1)">返回</div>
        <div id="title">分配房间</div>
      </div>

      <div id="LogoImg" class="row">
        <img src="image/login_logo.png">
      </div>

     </div>
      <div class="input_div" class="row">
        <div class="input_distritphone"><input id="phone" type="text" placeholder="请输入手机号" style="BORDER-TOP-STYLE: solid; BORDER-RIGHT-STYLE: solid; BORDER-LEFT-STYLE: solid; BORDER-BOTTOM-STYLE: solid"></div> 
        <br><br>
        <div class="input_distrittime">
      
            <input id="Enterdate" type="date" style="BORDER-TOP-STYLE: solid; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: solid; BORDER-BOTTOM-STYLE: solid"/> 
 
             <input id="Entertime" type="time" style="BORDER-TOP-STYLE: solid; BORDER-RIGHT-STYLE: solid; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"/>

          </div>
        <br><br>
        <div class="input_distrittime"><input id="OutEnterdate" type="date"style="BORDER-TOP-STYLE: solid; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: solid; BORDER-BOTTOM-STYLE: solid"/><input id="OutEntertime" type="time"style="BORDER-TOP-STYLE: solid; BORDER-RIGHT-STYLE: solid; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"/></div>
      <div class="input_loginbtnyes" class="row">
      <div id="input_div_btnyes" onClick="btnPressed()">确认分配</div>
      </div>
      
    </body>
</html>