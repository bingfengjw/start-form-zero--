$(function(window){
    'use strict';
    var itemRange = [];
    var oMenuItem = $(".menu li");
    $.each($(".content"),function(index,item){
        var itemHeight = $(item).height();
        itemRange.push({
            name:$(item).find('h1').attr('contentName'),
            minHeight:$(item).offset().top,
            maxHeight:$(item).offset().top + itemHeight
        });
    });
    $(document).scroll(function(e){
        var dH = $(document).scrollTop();           // 当前浏览到的高度
        // 每次滑动屏幕的时候遍历所有的右侧内容区，检测当前的高度符合哪个区域，就给对应的菜单标签加上class=active
        $.each(itemRange,function(index,item){
            if(dH>=item.minHeight&&dH<=item.maxHeight){
                var oActiveLi = $('.menu li[id='+item.name+']');
                
                if(!oActiveLi.hasClass('active')){
                    oMenuItem.removeClass('active');
                    oActiveLi.addClass('active');
                }
            }else if(dH<itemRange[0].minHeight||dH>itemRange[itemRange.length-1].maxHeight){
                // 超出content的范围则左侧的菜单栏不响应
                oMenuItem.removeClass('active');
            }
        });
    });
    oMenuItem.click(function(){
        $("html,body").animate({"scrollTop":itemRange[$(this).index()].minHeight},'fast')
    });
});