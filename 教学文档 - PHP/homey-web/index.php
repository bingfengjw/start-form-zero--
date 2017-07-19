<html>
     <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1,user-scalable=no">
          <title>中控2代</title>
          <link rel="stylesheet" type="text/css" href="">
          <script src="JS-CSS/jquery.min.js"></script>
      </head>  
      <body>
           <?php
             session_start();
             if(!sset($_GET["p"])) $_GET["p"]="signin";
             include($_GET["p"].".php");
           ?>   
       </body> 
</html>   