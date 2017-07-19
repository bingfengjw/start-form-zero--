
     <script type="text/javascript">
      window.onload=function(){
      var oBtns=document.getElementById('back');
      oBtns.onclick=function(){ 
      window.location.href="?p=devicelist"
         }
      var oBtn=document.getElementById('didselect');
      oBtn.onclick=function(){ 
      window.location.href="?p=add_name"
      }
      }
     </script>
      <style>
        ul {
          margin-top: 0px;
          text-align: center;
          width: 100%;
          padding: 0;
        }
        li {
          border-top: thin solid #000;
          /*background-color: red;*/
          height: 50px;
          line-height: 50px;
          /*border-bottom: thin solid #000;*/
          list-style-type: none;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .divsaddroomcell{
          float: left;
          width: 100%;
          height: 100%;
          /*background-color: blue;*/
        }
        .divscellname{
            text-align: left;
            /*background-color: blue;*/
            width: 80%;
            height: 100%;
        }
        .divscellname p{
           float: left;
           margin-top: 0px;
           margin-left: 20px;
            /*background-color: yellow;*/
           font-size: 24;
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
       #title{
                    float: left;
                    /*background-color: blue;*/
                    width: 60%;
                    height: 70px;
                    font-size: 24;
                    text-align: center;
              }
      </style>
      <div id="header">
        <div id="back" >返回</div>
        <div id="title">添加房间</div>
      </div>
      <div>
          <ul id="didselect">
            <li>
              <div class="divsaddroomcell">
                <div class="divscellname"><p>KEY-BOX-C7D1AABCE467</p></div> 
              </div>
            </li>
          </ul>
      </div>
