function Callbacks() {

}
Callbacks.prototype.has=function (type,fn) {
    return !!this[type]&&this[type].includes(fn)
};
Callbacks.prototype.add=function (type,...arg) {
    if(!this[type]){
        //如果没有这个类型,先给实例增加一个这个类型的数组,过滤到arg中的非函数,将arg直接赋值给这个类型
        this[type]= arg.filter((item)=>{
            return typeof item=="function"
        })
    }else{
        arg.forEach((item)=>{
            if(typeof item=="function"&&!this[type].includes(item)){
                this[type].push(item)
            }
        })
    }



};
Callbacks.prototype.remove=function (type,...arg) {
    //先判断有没没有这个类型,然后在去判断arg中每一项
    if(this[type]){
        arg.forEach((item)=>{
            if(this.has(type,item)){
                this[type].splice(this[type].indexOf(item),1)
            }
        })
    }
};
Callbacks.prototype.fire=function (type,...arg) {
    if(this[type]){
        this[type].forEach((item)=>{
            item.apply(this,arg)
        })
        }
};
//把Callbaks类的原型合并到Drag上,此时Drag的实例就可以使用Callbacks原型上方法
Object.assign(Drag.prototype,Callbacks.prototype);
function Drag(ele) {
    this.ele=ele;
    let down=(e)=>{
        this.ele.style.zIndex="999";
        this.x=e.clientX-this.ele.offsetLeft;
        this.y=e.clientY-this.ele.offsetTop;
        document.addEventListener("mousemove",move);
        //把当前这个down类型下的函数依次执行,顺便将事件对象e传给每一个函数,函数用不用随自己
        this.fire("down",e)
    };
    let move=(e)=>{
        this.ele.style.left=e.clientX-this.x+"px";
        this.ele.style.top=e.clientY-this.y+"px";
        e.preventDefault();
        this.fire("move",e)
    };
    let up=(e)=>{
        this.ele.style.zIndex="0";
        document.removeEventListener("mousemove",move);
        this.fire("up",e)

    };

    this.ele.addEventListener("mousedown",down);
    this.ele.addEventListener("mouseup",up)
}


//第一次扩展,关于border的问题
Drag.prototype.border=function () {
    this.add("down",this.addBorder);
    this.add("up",this.removeBorder)
    return this;
};
Drag.prototype.addBorder=function () {
    this.ele.className="ab";
    this.ele.children[0].style.display="none"

};
Drag.prototype.removeBorder=function () {
    this.ele.className="";
    this.ele.children[0].style.display="block"

};
//第二次扩展

Drag.prototype.bb=function () {
    this.add("move",this.bodyBG)
};
Drag.prototype.bodyBG=function () {
    document.body.style.background="yellow"
};

//第三次扩展
Drag.prototype.jump=function () {
    this.add("up",this.drop);

    //给他一个初速度
    this.speedY=1;
    return this;
};
Drag.prototype.drop=function () {
    //让速度加上一个值9.8;
    this.speedY+=9.8;
    //空气阻力系数
    this.speedY*=0.93;
    var T=this.ele.offsetTop+this.speedY;
    //临界值判断
    var maxT=document.documentElement.clientHeight-this.ele.offsetHeight;
    console.group(T);
    console.log(this.ele.offsetHeight);
    console.log('方块距离页面顶端的距离',maxT);
    console.log('offsetTop',this.ele.offsetTop);
    console.groupEnd();
    if(T>=maxT){
        T=maxT;
        this.speedY*=-1;
        this.f++;
    }else{
        this.f=0;
    }
    this.ele.style.top=T+"px";
    if(this.f<2){
        window.setTimeout(()=>{
            this.drop()
        },20)
    }

};