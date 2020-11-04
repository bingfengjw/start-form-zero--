// 和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

interface Shape1 {
    color: string;
}

interface Square1 extends Shape1 {
    sideLength: number;
}

let square1 = <Square1>{};
square1.color = "blue";
square1.sideLength = 10;
// 一个接口可以继承多个接口，创建出多个接口的合成接口。

interface Shape2 {
    color: string;
}

interface PenStroke2 {
    penWidth: number;
}

interface Square2 extends Shape2, PenStroke2 {
    sideLength: number;
}

let square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;