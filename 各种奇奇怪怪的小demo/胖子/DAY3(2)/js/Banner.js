window.Banner = function (id, url, duration, interval) {
    this.banner = document.getElementById(id);
    this.bannerInner = this.banner.getElementsByClassName("bannerInner")[0];
    this.focusList = this.banner.getElementsByClassName("focusList")[0];
    this.imgList = this.bannerInner.getElementsByTagName("img");
    this.list = this.focusList.getElementsByTagName("li");
    this.left = this.banner.getElementsByClassName("left")[0];
    this.right = this.banner.getElementsByClassName("right")[0];
    this.timer = null;
    this.data = null;
    this.step = 0;
    this.isClick = true;
    this.url = url;

    if (duration > interval) {
        [duration, interval] = [interval, duration]
    }
    this.duration = duration || 1000;
    this.interval = interval || 2000;
};
//获取数据
Banner.prototype.getData = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, false);
    xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            this.data = JSON.parse(xhr.responseText)
        }
    };
    xhr.send(null);
};
//绑定数据
Banner.prototype.bindHTML = function () {
    let str1 = ``,
        str2 = ``;
    this.data.forEach((item, index) => {
        str1 += `<div><img src="${item.src}" alt=""></div>`;
        str2 += index == 0 ? `<li class="selected"></li>` : `<li></li>`
    });
    this.bannerInner.innerHTML = str1;
    this.focusList.innerHTML = str2;
    this.imgList[0].parentNode.style.zIndex = 1;
    this.imgList[0].animation({
        opacity: 1
    }, this.duration);
};
Banner.prototype.move = function () {
    //this, 就是实例
    if (this.step == this.data.length - 1) {
        this.step = -1
    }
    this.step++;
    this.imgChange();
};
//
Banner.prototype.imgChange = function () {
    // 绑定将_this指定为Banner实例(为了方便下面同时用到this的情况,所以这里先绑定一下);
    let _this = this;
    // 获取到除了当前项之外的所有div
    let sib = $.siblings(this.imgList[this.step].parentNode);
    // 将除了当前项之外的所有div的z-index都设置为0
    for (let i = 0; i < sib.length; i++) {
        sib[i].style.zIndex = 0;
    }
    // 将当前项的z-index设置为1 (为了将当前项放到最上层,防止被挡住)
    this.imgList[this.step].parentNode.style.zIndex = 1;
    // 设置一个渐现的动画,然后执行回调函数,将所有不是当前的图片的透明度设置为0
    this.imgList[this.step].animation({
        opacity: 1
    }, this.duration, function () {
        for (let i = 0; i < _this.imgList.length; i++) {
            if (_this.imgList[i] != this) {
                _this.imgList[i].style.opacity = 0;
            }
        }
        _this.isClick = true;
    });
    for (let i = 0; i < this.list.length; i++) {
        this.list[i].className = i == this.step ? "selected" : "";
    }
};
Banner.prototype.autoMove = function () {
    //this==实例
    this.timer = setInterval(() => {
        //没有this,这里面的this是上一级的this实例,所以用箭头函数
        this.move();
    }, this.interval)
    //只有执行了autoMove才会自动轮播,才需要给banner绑定鼠标滑过事件
    this.mouseEvent();
    return this;
}

//鼠标滑过事件
Banner.prototype.mouseEvent = function () {
    this.banner.onmouseover = () => {
        clearInterval(this.timer)
    }
    this.banner.onmouseout = () => {
        this.timer = setInterval(() => {
            //箭头函数没有this,这里面的this是上一级的this实例,所以用箭头函数
            this.move();
        }, this.interval)
    }

}


//左右切换
Banner.prototype.changeArrow = function () {
    this.left.onclick = () => {
        if (this.isClick) {
            this.isClick = false;
            if (this.step == 0) {
                this.step = this.data.length;
            }
            this.step--;
            this.imgChange();
        }
    }
    this.right.onclick = () => {
        if (this.isClick) {
            this.isClick = false;
            this.move();
        }

    }
    return this;
}

//焦点点击
Banner.prototype.focusChange = function () {
    for (let i = 0; i < this.list.length; i++) {
        this.list[i].onclick = () => {
            this.step = i;
            this.imgChange();
        }
    }
}


//初始化,获取数据,绑定数据
Banner.prototype.init = function () {
    //this 都是当前实例
    this.getData();
    this.bindHTML();
    return this;
}