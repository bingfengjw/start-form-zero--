<?php

include("function.php");

$postString = json_decode($_POST['param']);

if(!isset($postString->cmd)) {
    $res = postData(json_decode($_POST['param']));
    echo json_encode($res);
}
else {
    //获取token
    if ($postString->cmd == 9001) {
        $res = postOpenAPI('http://api.gizwits.com/app/login', json_encode($postString->data), 3);
        if(strlen(json_decode($res)->token) > 0) $_SESSION['user'] = $postString->data->username;
        echo $res;
    }
    //获取验证码
    elseif ($postString->cmd == 9002) {
        $res = postOpenAPInewuser('http://api.gizwits.com/app/sms_code', json_encode($postString->data), 3);
        echo $res;
    }
    //注册
    elseif ($postString->cmd == 9003) {
        $res = postOpenAPIzhuce('http://api.gizwits.com/app/users', json_encode($postString->data), 3);
        echo $res;
    }
    //忘记密码
    elseif ($postString->cmd == 9004) {
        $res = postOpenAPIpassword('http://api.gizwits.com/app/reset_password', json_encode($postString->data), 3);
        echo $res;
    }
    else {

    }
}

?>