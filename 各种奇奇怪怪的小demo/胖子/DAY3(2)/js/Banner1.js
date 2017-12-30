window.Banner = function (id, url, duration, interval) {
    //this Banner的实例
    this.banner = document.getElementById(id);
    this.bannerInner = this.banner.getElementsByClassName("bannerInner")[0];
    this.focusList = this.banner.getElementsByClassName("focusList")[0];
    this.imgList = this.bannerInner.getElementsByTagName("img");
    this.list = this.focusList.getElementsByTagName("li");
    this.left = this.banner.getElementsByClassName("left")[0];
    this.right = this.banner.getElementsByClassName("right")[0];
    this.data = null;
    this.timer = null;
    this.step = 0;
    this.isClick = true;
    this.url = url;
    if (duration > interval)[duration, interval] = [interval, duration];
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
            console.log(this.data);
        }
    }
    xhr.send(null)
}
Banner.prototype.bindHTML = function () {

}

Banner.prototype.init = function () {
    this.getData();
    return this;
}