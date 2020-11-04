// 下面通过一个简单示例来观察接口是如何工作的：

function printLabel1(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);
// 类型检查器会查看printLabel1的调用。 printLabel1有一个参数，并要求这个对象参数有一个名为label类型为string的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。 然而，有些时候TypeScript却并不会这么宽松，我们下面会稍做讲解。

// 下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：

interface LabelledValue {
    label: string;
}

function printLabel2(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj2 = { size: 10, label: "Size 10 Object" };
printLabel2(myObj2);
// LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

// 还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。



// -----------------------------------
printLabel2({ label: 11 })