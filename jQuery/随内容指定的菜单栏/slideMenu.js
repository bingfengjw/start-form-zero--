$(function (window) {
    'use strict';


    /* 
    基础结构：
    <ul class="menu">                   <== 菜单列表：
        <li id="1111">1111</li>                 li的id对应着下面内容区域中h1的contentName属性
        <li id="2222">2222</li>
        <li id="3333">3333</li>
    </ul>
    <content>
        <div class="content">
            <h1 contentName="1111"></h1>    <== contentName对应上面li的id，只要是一样的就可以
        </div>
        <div class="content">
            <h1 contentName="2222"></h1>
        </div>
    </content>
    
    
    */
    var itemRange = [];
    var oMenuItem = $(".menu li");
    // 储存所有内容的高度
    $.each($(".content"), function (index, item) {
        var itemHeight = $(item).height();
        itemRange.push({
            name: $(item).find('h1').attr('contentName'),
            minHeight: $(item).offset().top,
            maxHeight: $(item).offset().top + itemHeight
        });
    });
    $(document).scroll(function (e) {
        var dH = $(document).scrollTop(); // 当前浏览到的高度
        // 每次滑动屏幕的时候遍历所有的右侧内容区，检测当前的高度符合哪个区域，就给对应的菜单标签加上class=active
        $.each(itemRange, function (index, item) {
            if (dH >= item.minHeight && dH <= item.maxHeight) {
                var oActiveLi = $('.menu li[id=' + item.name + ']');

                if (!oActiveLi.hasClass('active')) {
                    oMenuItem.removeClass('active');
                    oActiveLi.addClass('active');
                }
            } else if (dH < itemRange[0].minHeight || dH > itemRange[itemRange.length - 1].maxHeight) {
                // 超出content的范围则左侧的菜单栏不响应
                oMenuItem.removeClass('active');
            }
        });
    });
    // 点击菜单栏跳转到对应的内容区域
    oMenuItem.click(function () {
        $("html,body").animate({
            "scrollTop": itemRange[$(this).index()].minHeight
        }, 'fast')
    });
});