<?php
session_start();
function postData($data) {
    $ch = curl_init();
    $url = 'http://homey.zono.cn/op.php';
    $data_string = json_encode($data->body);
    $header = array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string),
        'user: '.$data->head->user,
        'token: 0'
    );
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
    return json_decode($res);
}

function postOpenAPI($url, $post_data = '', $timeout = 5){
    $headerArr = array("X-Gizwits-Application-Id: 86201b44729942d4a9331c49c44eff13");
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_POST, 1);
    if($post_data != ''){
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    }
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr);
    $file_contents = curl_exec($ch);
    curl_close($ch);
    return $file_contents;
}
function getToken($url, $timeout = 5) {
    $headerArr = array('X-Gizwits-Application-Id: 86201b44729942d4a9331c49c44eff13','X-Gizwits-Application-Auth:'.md5("86201b44729942d4a9331c49c44eff136597fb0dc2ae430094174c5fc526eb32"));
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_POST, 1);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr);
    $file_contents = curl_exec($ch);
    curl_close($ch);
    return $file_contents;
}
function postOpenAPInewuser($url, $post_data = '', $timeout = 5){
    $token = json_decode(getToken('http://api.gizwits.com/app/request_token', 3))->token;
    $headerArr = array('X-Gizwits-Application-Id: 86201b44729942d4a9331c49c44eff13','X-Gizwits-Application-Token:'.$token);
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_POST, 1);
    if($post_data != ''){
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    }
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr);
    $file_contents = curl_exec($ch);
    curl_close($ch);
    return $file_contents;
}

function postOpenAPIzhuce($url, $post_data = '', $timeout = 5){
    // $token = json_decode(getToken('http://api.gizwits.com/app/request_token', 3))->token;
    $headerArr = array('X-Gizwits-Application-Id: 86201b44729942d4a9331c49c44eff13');
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_POST, 1);
    if($post_data != ''){
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    }
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr);
    $file_contents = curl_exec($ch);
    curl_close($ch);
    return $file_contents;
}

function postOpenAPIpassword($url, $post_data = '', $timeout = 5){
    // return $post_data;
    $headerArr = array('Content-Type: application/json','X-Gizwits-Application-Id: 86201b44729942d4a9331c49c44eff13');
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_POST, 1);
    if($post_data != ''){
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    }
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArr);
    // return $url;
    $file_contents = curl_exec($ch);
    curl_close($ch);
    return $file_contents;
}

?>