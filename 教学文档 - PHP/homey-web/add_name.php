      <input type="hidden" id="session_user" value="<?php echo $_SESSION['user']; ?>">
     <script type="text/javascript">
      //获得历史记录
          function addname() {
              var head = new Object();
              head.user=$("#session_user").val(); 
              var body = new Object();
              body.cmd = 1003;
              body.name= $("#name").val();
              body.mac= "C7D1AABCE467";
              var pack = new Object();
              pack.head = head;
              pack.body = body;
              var req = JSON.stringify(pack);
              $.post("op.php", { param: req },
                  function(data){
                    // alert("历史数据");
                      // alert(data);
                      var obj = jQuery.parseJSON(data);
                      if (obj.cmd != 1004) {
                          alert("返回数据错误");
                          return;
                      }
                      if (obj.errno == 0) {
                          alert("添加成功");
                          window.location.href="?p=devicelist"
                      }
                      else if (obj.errno==1) {
                          alert("锁已存在");
                      };
                      
                  });
          }
     window.onload=function(){
      var oBtn=document.getElementById('back');
      oBtn.onclick=function(){ 
           window.location.href="?p=devicelist"
      }
      var oBtn=document.getElementById('input_div_btn');
      oBtn.onclick=function(){ 
            addname();
           
      }
      }
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
     font-size: 24;
     text-align: center;
     }
     #name{
         text-align: center;
     }
     </style>

      <div id="header">
        <div id="back" >返回</div>
        <div id="title">添加房间</div>
      </div>
      <div id="LogoImg" class="row">
        <img src="image/login_logo.png">
      </div>
      <br><br>
        <div class="input_addname" class="row"> 
        <div class="input_addnameright"><input  id="name" type="text" placeholder="请输入房间名称" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: solid"></div> 
        </div>
       <div class="input_addnameinbtn" class="row">
      <div id="input_div_btn">确认名称</div>
      </div>
