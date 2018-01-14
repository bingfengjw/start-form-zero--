

(function (pro) {
    pro.analyticUrl=function () {
        return eval("({"+this.split("?")[1].replace(/=/g,":'").replace(/&/g,"',")+"'})")
    }
})(String.prototype);

function addZero(num) {
    return num=num<10?"0"+num:num;
}

//loading显示  单例模式
let loadingRender=(function () {
    //将页面上所有的图片放在一个数组中
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];
    //获取想要操作的元素
    let $loading=$("#loading"),$progressBox=$(".progressBox"),
        step=0,//记录加载第几张
        total=ary.length;//图片的个数

    return{
        init(){
            //显示当前区域
            $loading.css("display","block");
            //循环数组加载图片
            $.each(ary,(index,item)=>{
                //创建img
                let img=new Image;
                img.src="img/"+item;
                img.onload=function () {
                    step++;
                    $progressBox.css({width:step/total*100+"%"});
                    if (step==total){
                        //此时进度条加载完成,进入下一个场景
                        //为了效果明显,给他加一个定时器,延迟一段时间再显示下一个场景
                        if (page==0) return
                        window.setTimeout(()=>{
                            $loading.css({display:"none"});
                            //下一个phone场景显示
                            phoneRender.init();
                        },2000)
                    }
                }
            })
        }
    }
})();

let phoneRender=(function () {
    //获取当前区域元素
    let $phone=$("#phone"),$listen=$phone.children(".listen");
    let $listenTouch=$listen.children(".touch"),$derail=$phone.children(".details");
    let $derailTouch=$derail.children(".touch"),$time=$(".time");
    let listenMusic=$("#listenMusic")[0],detailMusic=$("#detailMusic")[0];
    let musicTimer=null;
    function detailMusicPlay() {
        //detailMusic播放
        detailMusic.play();
        //设置定时器,每隔一秒钟获取播放进度,转化成分:秒的形式;
        musicTimer=window.setInterval(()=>{
            //获取当前音频播放的时间
            let current=detailMusic.currentTime,
            m=Math.floor(current/60),
            s=Math.floor(current-m*60);
            $time.html(addZero(m)+":"+addZero(s));
            //当音频自己播放完成,也是关闭当前区域显示下一个区域
            //duration:获取音频总时间
            if (current>=detailMusic.duration){
                //执行关闭当前区域的函数closePhone
                window.clearInterval(musicTimer);
                if (page==1)return;
                closePhone();
            }
        },1000)
    };
    function closePhone() {
        window.clearInterval(musicTimer);
        //让phone消失之前先关闭音频
        detailMusic.pause();
        $phone.css("transform","translateY(100%)").on("transitionend",function () {
            //过渡完成之后执行的函数
            $phone.css({display:"none"});
        });
        //接下来对话窗口显示 MessageRender
        MessageRender.init();
    };
    return{
        init(){
            console.log('phoneRender');
            $phone.css({display:"block"});
            //播放接听铃声,listenMusic
            listenMusic.play();
            //给listenTouch绑定jiet事件,单击事件,zepto给元素提供了一个现成单击事件 singleTap
            $listenTouch.singleTap(function (e) {
                //让listen消失
                $listen.css("display","none");
                //让铃声停止播放
                listenMusic.pause();
                //让detail显示,从底部上来
                $derail.css({transform:"translateY(0)"});
                //让时间显示
                $time.css({display:"block"});
                //对话播放
                detailMusicPlay();
            });
            //detailTouch绑定单击事件
            $derailTouch.singleTap(closePhone)
        }
    }
})();
//Message显示 单例模式
let MessageRender=(function () {
    //获取当前区域所需要的元素
    let $message=$("#message"),
        $messageList=$(".messageList"),
        $messageListLi=$messageList.children("li"),
        $keyBoard=$(".keyBoard"),
        $textTip=$(".textTip"),
        $submit=$(".submit");
    let msgMusic=$("#msgMusic")[0];
    let messageTimer=null,//打字效果的定时器
        autoTimer=null,//消息推送的定时器
        step=-1,//记录显示的那一条消息
        total=$messageListLi.length,//消息的总条数
        top=0;//往上移动的距离
    //消息推送函数
    function messageMove() {
        console.log('messageMove');
        //先播放背景音乐
        msgMusic.play();
        //设置定时器开始消息推送
        autoTimer=window.setInterval(()=>{
            step++;
            //获取要推送的消息就是对应的li(索引是step)
            let $curLI=$messageListLi.eq(step);
            $curLI.css({transform:"translateY(0)",opacity:1});
            //当推送到第三条,让keyBoard显示,暂时推送
            if(step==2){
                //清除定时器停止推送
                window.clearInterval(autoTimer);
                //让可以Board显示(从底部出来)
                $keyBoard.css({transform:"translateY(0)"});
                //先让textTip显示
                $textTip.css({display:"block"});
                //开始打字效果
                textMove()
            }
            //当显示到第四条的时候,在推送的时候开始往上平移
            if(step>2){
                //往上平移是负值
                top-=$curLI[0].offsetHeight+10;
                //将ul整体往上移动top
                $messageList.css({transform:"translateY("+top+"px)"})
            }
            //当消息推送完成时候
            if(step==total-1){
                //清除定时器
                window.clearInterval(autoTimer);
                //关闭音乐
                msgMusic.pause();
                //为了开发方便 如果page==2了,停止在这个区域,也就是下面的代码不执行了
                if(page==2) return;
                //当前message区域消失,下一个区域显示
                $message.css({display:"none"});
                CubeRender.init();
            }
        },1500)
    }
    //模拟打字效果的函数
    function textMove() {
        let textStr="都学会了,可还是找不到工作呀!",
            n=-1;
        //设置定时器.5s显示一个字
        messageTimer=window.setInterval(()=>{
            n++;
            //将显示的文字加在textTip上
            $textTip.html($textTip.html()+textStr[n]);
            //当字打完了清除定时器
            if(n==textStr.length-1){
                window.clearInterval(messageTimer);
                //显示发送按钮submit
                $submit.css({display:"block"});
                //给发送按钮绑定单击事件
                $submit.singleTap(function () {
                    //先让textTip的文字消失
                    $textTip.html("").css("display","none");
                    //keyBoard下去
                    $keyBoard.css({transform:"translateY(3.7rem)"});
                    //继续消息推送,也就是继续执行messageMove函数即可
                    messageMove();
                })
            }
        },500)
    }
    return{
        init(){
            console.log('MessageRender run');
            $message.css({display:"block"});
            messageMove();
        }
    }
})();


let CubeRender=(function () {
    return{
        init(){

        }
    }
})();

let page=window.location.href.analyticUrl().page;
page==0||isNaN(page)?loadingRender.init():null;
page==1?phoneRender.init():null;
page==2?MessageRender.init():null;