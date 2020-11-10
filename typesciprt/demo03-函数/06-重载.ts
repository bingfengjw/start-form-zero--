// JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。

let suits1 = ["hearts", "spades", "clubs", "diamonds"];

function pickCard1(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits1[pickedSuit], card: x % 13 };
    }
}

let myDeck1 = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard11 = myDeck1[pickCard1(myDeck1)];
alert("card: " + pickedCard11.card + " of " + pickedCard11.suit);

let pickedCard21 = pickCard1(15);
alert("card: " + pickedCard21.card + " of " + pickedCard21.suit);
// pickCard方法根据传入参数的不同会返回两种不同的类型。 如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。 如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢。

// 方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用。 下面我们来重载 pickCard函数。

let suits2 = ["hearts", "spades", "clubs", "diamonds"];

function pickCard2(x: { suit: string; card: number; }[]): number;
function pickCard2(x: number): { suit: string; card: number; };
function pickCard2(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits2[pickedSuit], card: x % 13 };
    }
}

let myDeck2 = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard12 = myDeck2[pickCard2(myDeck2)];
alert("card: " + pickedCard12.card + " of " + pickedCard12.suit);

let pickedCard22 = pickCard2(15);
alert("card: " + pickedCard22.card + " of " + pickedCard22.suit);
// 这样改变后，重载的pickCard函数在调用的时候会进行正确的类型检查。

// 为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

// 注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。