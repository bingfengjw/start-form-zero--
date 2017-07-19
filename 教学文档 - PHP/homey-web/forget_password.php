<html> 
    <head>
      <meta charset="utf-8">
      <!-- <meta name="viewport" content="width=480px,target-densitydpi=device-dpi,user-scalable=no;"/> -->
      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
      <title>Homey</title>
      <link rel="stylesheet" type="text/css" href="css-js/userpasswordcss.css">
      <script src="css-js/jquery-1.11.1.min.js"></script>
  
     <script type="text/javascript">
      window.onload=function(){
      var oBtn=document.getElementById('back');
      oBtn.onclick=function(){
           window.location.href="http://homey.dev/";
      }
      var oBtnss=document.getElementById('rightrow1');
      oBtnss.onclick=function(){ 
            if ($("#phone").val()==null || $("#phone").val()=="") {
                alert("手机号码不能为空");
            } 
            else{
                 btnyanzhengma();
            };
      }
      var oBtns=document.getElementById('input_div_btn');
      oBtns.onclick=function(){ 
           if ($("#passwordss").val()==null || $("#code").val()==null ||$("#passwordss").val()=="" ||$("#code").val()=="") {
                 alert("手机或验证码和密码不能为空");
           } else{
                 btnnewspassword();
           };
          
      }
      function btnyanzhengma()
      {   
        if ($("#phone").val()=="") {
               alert("手机号码不能为空");
            }
        else{
          var request= new Object();
          request.cmd=9002;
          var data = new Object();
          data.phone=$("#phone").val();
          request.data = data;
          var req=JSON.stringify(request);
          $.post("op.php", { param: req },
          function(data){
                // alert(data);
                var obj = jQuery.parseJSON(data);
                if (obj.data==null || obj.data=="") {
                  alert("已发送");
                }
                else{
                     alert("发送失败");
                }   
               });
          }
       
      }
      function btnnewspassword(){
       
        
           var request= new Object();
          request.cmd=9004;
          var data = new Object();
          data.phone=$("#phone").val();
                             // alert($("#phone").val());
          data.new_pwd=$("#passwordss").val();
                             // alert($("#passwordss").val());
          data.code=$("#code").val();
                             // alert($("#code").val());
          request.data = data;
          var req=JSON.stringify(request);
            $.post("op.php", { param: req },
            function(data){
                // alert(data);
                var obj = jQuery.parseJSON(data);
                if (obj.data==null || obj.data=="") {
                    alert("修改成功");
                    window.location.href="javascript:history.back(-1)";
                }
                else{
                     alert("修改失败,请重试");
                }   
            });
                    
        }
              
     }
     </script>
    </head>
    <body>
      <div id="header">
        <div id="back">返回</div>
        <div id="title">忘记密码</div>
      </div>
      <div class="row" >
          <div class="leftimg">
            <img src="image/phone.png">
          </div>
          <div class="rightrow">
            <div ><input id="phone" type="text" placeholder="请输入手机号" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid">
            <div id="rightrow1">发送</div>
          </div>
          </div>
      </div>
      <div class="row">
         <div class="leftimg"><img src="image/sms.png"></div>
         <div id="rightrow2"><input id="code" type="text" placeholder="请输入验证码" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"></div>
      </div>
      <div class="row">
         <div class="leftimg"><img src="image/login_password.png"></div>
         <div id="rightrow3"><input id="passwordss" type="text" placeholder="请设置密码" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"></div>
      </div>      

       <br><br>
       <div id="input_div" class="row">
         <div id="input_div_btn">确定密码</div>
       </div>
    </body>
  </html>