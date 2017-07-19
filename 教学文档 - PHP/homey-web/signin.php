
      <div id="header" class="row">
        <h1>机智云账号登录</h1>
      </div>
      <div id="LogoImg" class="row">
        <img src="image/login_logo.png">
      </div>
      <div class="input_div" class="row">
        <div class="input_left"><img src="image/phone.png">
        </div> 
        <div class="input_right"><input value="13261137606" id="userphone" type="text" placeholder="请输入手机号" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"></div>
        <br><br><br><br><br><br>
        <div class="input_left"><img src="image/login_password.png"></div>
        <div class="input_right"><input value="aaaaaa" id="userpasswords" type="password" placeholder="请输入密码" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"></div>
      </div>

      <div id="UserPassword">
          <div id="user"><a href="newuser.php";return false>用户注册</a></div>
          <div id="passWord"><a href="forget_password.php";return false>忘记密码?</a></div>
      </div>

      <div class="input_loginbtn" class="row">
      <div id="input_div_btn">登录</div>
      </div>
      <script type="text/javascript">
     window.onload=function(){
      var oBtn=document.getElementById('input_div_btn');
      oBtn.onclick=function(){ 
       var phone= $("#userphone").val();
       var passwordss=$("#userpasswords").val();
        if (phone==""||passwordss=="") {
                   alert("手机号和密码不能为空");
                   return;
            }
            else btnPressed();
          }
        }  
     function btnPressed(){
          var request= new Object();
          request.cmd= 9001;
          var data = new Object();
          data.username=$("#userphone").val();
          data.password=$("#userpasswords").val();
          request.data = data;
          var req=JSON.stringify(request);
            $.post("op.php", { param: req },
            function(datas){
              // alert(datas);
                var obj = jQuery.parseJSON(datas);
                    if (obj.token== null||obj.token=="") {
                    alert("登录失败");
                    return;
                  }
                   if (obj.token != null) {
                    alert("登录成功");
                    window.location.href="?p=devicelist";
                  }
                  else alert('登录错误：'+obj.errno);
              
                  
               
            });
      }
     </script>