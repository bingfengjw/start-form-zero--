let banner=document.getElementById("banner");
let bannerInner=banner.getElementsByClassName("bannerInner")[0];
let focusList=banner.getElementsByClassName("focusList")[0];
let list=focusList.getElementsByTagName("li");
let btnleft=banner.getElementsByClassName("left")[0];
let btnright=banner.getElementsByClassName("right")[0];
let imglist=bannerInner.getElementsByTagName("img");
let data=null,timer=null,step=0,isclick=true;


function getdata() {
    let xhr=new XMLHttpRequest();
    xhr.open("GET","json/data.json",false);
    xhr.onreadystatechange=function () {
        if (xhr.status==200&&xhr.readyState==4){
            data=JSON.parse(xhr.responseText)
        }
    };
    xhr.send(null);
};
function bindHTML(data) {
    let strHTML=``,strfocus=``;
    data.forEach((item,index)=>{
        strHTML+=`<div><img src="${item.src}" alt=""></div>`;
        strfocus+=index==0?`<li class="selected"></li>`:`<li></li>`
    });
    bannerInner.innerHTML=strHTML;
    focusList.innerHTML=strfocus;
    //默认显示第一张图,将第一张图片的父级层级关系zindex变成1
    $.css(imglist[0].parentNode,"zIndex",1);
    imglist[0].animation({opacity:1},1000);
};
function move() {
    if (step==data.length-1){
        step=-1
    }
    step++;
    imgchange();
};
function imgchange() {
    //获取当前图片父亲的兄弟
    let s=$.siblings(imglist[step].parentNode);
    //让所有的兄弟们的zindex变成0
    for (let i=0;i<s.length;i++){
        $.css(s[i],"zIndex",0);
    }
    //让当前图片的父亲的zindex变成1
    $.css(imglist[step].parentNode,"zIndex",1);
    //让当前图片实现渐变
    //注意:其他的图片opacity都变成0,但是不可以放在渐变之前,容易造成背景图片的外漏,但是其他的图片opacity必须得变成0,要不然下一次就没有渐变效果了,所以将其放在渐变动画完成后,就是放在动画的回调函数中
    imglist[step].animation({opacity:1},1000,function () {
        //将其他图片opacity变成0
        for(let i=0;i<imglist.length;i++){
            if (imglist[i]!=this){
                imglist[i].style.opacity="0";
            }
        };
        isclick=true;
    })
    //焦点同步
    for (let i=0;i<list.length;i++){
        list[i].className=i==step?"selected":""
    }
};
function mouseEvent() {
    banner.onmouseover=function () {
        clearInterval(timer)
    };
    banner.onmouseout=function () {
        timer=setInterval(move,2000);
    }
};
function btnEvent() {
    btnleft.onclick=function () {
        if (isclick){
            isclick=false;
            step--;
            imgchange();
        }
    };
    btnright.onclick=function () {
        if (isclick){
            isclick=false;
            move();
        }
    }
}
function focusEvent() {
    for (let i=0;i<list.length;i++){
        list[i].onclick=function () {
            if (isclick){
                isclick=false;
                step=i;
                imgchange();
            }
        };
    }
}