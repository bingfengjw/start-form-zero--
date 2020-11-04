// 我们在第一个例子里使用了接口，TypeScript让我们传入{ size: number; label: string; }到仅期望得到{ label: string; }的函数里。 我们已经学过了可选属性，并且知道他们在“option bags”模式里很有用。

// 然而，天真地将这两者结合的话就会像在JavaScript里那样搬起石头砸自己的脚。 比如，拿 createSquare例子来说：

interface SquareConfig1 {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig1): { color: string; area: number } {
    // ...
}

let mySquare1 = createSquare({ colour: "red", width: 100 });
// 注意传入createSquare的参数拼写为colour而不是color。 在JavaScript里，这会默默地失败。

// 你可能会争辩这个程序已经正确地类型化了，因为width属性是兼容的，不存在color属性，而且额外的colour属性是无意义的。

// 然而，TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

// error: 'colour' not expected in type 'SquareConfig1'
let mySquare2 = createSquare({ colour: "red", width: 100 });
// 绕开这些检查非常简单。 最简便的方法是使用类型断言：

let mySquare3 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig1);
// 然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

interface SquareConfig2 {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// 我们稍后会讲到索引签名，但在这我们要表示的是SquareConfig2可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。

// 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。

let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
// 要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。 就是说你遇到了额外类型检查出的错误，比如“option bags”，你应该去审查一下你的类型声明。 在这里，如果支持传入 color或colour属性到createSquare，你应该修改SquareConfig定义来体现出这一点。