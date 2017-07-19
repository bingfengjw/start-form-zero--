<div id="header">
        <div id="backabout">返回</div>
        <div id="title">关于</div>
</div>
<div id="logimage">
  <img src="image/icon@3x.png">
  <div id="Edition">程序版本：1.3.0.111114</div>
  <div id="SDKEdition">SDK版本:2.02.02</div>
</div>
<link rel="stylesheet" type="text/css" href="css-js/homeystyle.css">
<script type="text/javascript">
 window.onload=function(){
      //返回
      var oBtns=document.getElementById('backabout');
      oBtns.onclick=function(){ 
           window.location.href="?p=devicelist"
         }
      }
  </script> 
  <style type="text/css">
  #backabout{
                 float: left;
                 /*background-color: red;*/
                 height: 70px;
                 line-height: 70px;
                 width: 20%;
                 font-size: 19;
                 text-align: center;
              }
#title{
      float: left;
      /*background-color: blue;*/
      width: 60%;
      height: 70px;
      font-size: 21px;
      text-align: center;
}
  #logimage{
      width: 100%;
      height: 50%;
      /*background-color: red;*/
  }
  #logimage img{
      width: 25%;
      height: 30%;
      margin-top:200px;
      margin-left: 37%;
  }
  #Edition{
      /*background-color: red;*/
      width:46%;
      height: 20px; 
      margin-left: 27%;
      margin-top: 30px;
  }
  #SDKEdition{
      /*background-color: red;*/
      width:30%;
      height: 20px;
      margin-top: 20px;
      margin-left: 35%;
  }
  </style>