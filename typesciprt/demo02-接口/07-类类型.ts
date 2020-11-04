// 实现接口
// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。

interface ClockInterface1 {
    currentTime: Date;
}

class Clock1 implements ClockInterface1 {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
// 你也可以在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样：

interface ClockInterface2 {
    currentTime: Date;
    setTime(d: Date);
}

class Clock2 implements ClockInterface2 {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。





// 类静态部分与实例部分的区别
// 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

interface ClockConstructor3 {
    new (hour: number, minute: number);
}

class Clock3 implements ClockConstructor3 {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

 
// 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。






// 因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。

interface ClockConstructor4 {
    new (hour: number, minute: number): ClockInterface4;
}
interface ClockInterface4 {
    tick();
}

function createClock(ctor: ClockConstructor4, hour: number, minute: number): ClockInterface4 {
    return new ctor(hour, minute);
}

class DigitalClock4 implements ClockInterface4 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock4 implements ClockInterface4 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock4, 12, 17);
let analog = createClock(AnalogClock4, 7, 32);
// 因为createClock的第一个参数是ClockConstructor4类型，在createClock(AnalogClock4, 7, 32)里，会检查AnalogClock4是否符合构造函数签名。