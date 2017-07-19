<!-- 
<html> 
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=480px,target-densitydpi=device-dpi,user-scalable=no;" />
      <title>Homey</title>
      <input type="hidden" id="session_user" value="<?php echo $_SESSION['user']; ?>">

      <link rel="stylesheet" type="text/css" href="css-js/UserPassWordCSS.css">
      <style>
          #titles{
           /*  background-color: red;*/
             text-align: center;
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
          #divbackground{
              display: block;
          }
          #divbackground2{

              display: none;
              height: 100px;
              width: 100%;
          }
          #divbackground3{
              display: none;
          }
      </style>
      <script src="http://www.w3school.com.cn/jquery/jquery-1.11.1.min.js"></script>
      <script src"js.js"></script>
      <script type="text/javascript"></script>
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
        // alert(Request.id);
        document.getElementById('titles').innerHTML=utf8ToChar(Request.name);
        function utf8ToChar(str) {  
        var iCode, iCode1, iCode2;  
        iCode = parseInt("0x" + str.substr(1, 2));  
        iCode1 = parseInt("0x" + str.substr(4, 2));  
        iCode2 = parseInt("0x" + str.substr(7, 2));  
        return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
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
          }

         </script>
    </head>
      <body>
        <div id="header">
        <div id="back" >返回</div>
        <div id="titles"></div>
        </div>
        <div id="divbackground">
        <div class="divlock"><img src="image/ctlImg.png"><div id="state"><p>锁头：0  锁盒： 0  钥匙： 0  电量： 0 </p></div></div>
      </div>
    </body>
</html> -->