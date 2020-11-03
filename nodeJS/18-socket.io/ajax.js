/**
 * Created by Administrator on 2017/2/14.
 */
function ajax(url,type,param,dataType,callback){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(type == 'get'){
        url += "?" + param;
    }
    xhr.open(type,url,true);

    var data = null;
    if(type == 'post'){
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    xhr.send(data);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = xhr.responseText;
                if(dataType == 'json'){
                    data = JSON.parse(data);
                }
                callback(data);
            }
        }
    }
}